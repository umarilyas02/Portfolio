const GITHUB_USERNAME = "UMARILYAS02";
const GITHUB_API = "https://api.github.com";
const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";
const EVENT_PAGES = [1, 2, 3];

const EVENT_WEIGHTS = {
  PushEvent: (event) => event.payload?.commits?.length || 1,
  PullRequestEvent: 1,
  IssuesEvent: 1,
  IssueCommentEvent: 1,
  PullRequestReviewEvent: 1,
  CreateEvent: 1,
};

function getDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function createDateRange() {
  const end = new Date();
  const endDate = new Date(
    Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()),
  );
  const startDate = new Date(endDate);
  startDate.setUTCFullYear(startDate.getUTCFullYear() - 1);

  return { startDate, endDate };
}

function createContributionDays(events) {
  const { startDate: windowStart, endDate: end } = createDateRange();
  const start = new Date(windowStart);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());
  const windowEnd = new Date(end);
  windowEnd.setUTCDate(windowEnd.getUTCDate() + (6 - windowEnd.getUTCDay()));

  const counts = new Map();

  for (const event of events) {
    const date = new Date(event.created_at);
    if (Number.isNaN(date.valueOf()) || date < windowStart || date > end) {
      continue;
    }

    const weight = EVENT_WEIGHTS[event.type];
    if (!weight) continue;

    const amount = typeof weight === "function" ? weight(event) : weight;
    const key = getDateKey(date);
    counts.set(key, (counts.get(key) || 0) + amount);
  }

  const totalDays = Math.round((windowEnd - start) / 86400000) + 1;

  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    const key = getDateKey(date);
    return { date: key, count: counts.get(key) || 0 };
  });
}

function createGraphQLContributionDays(weeks) {
  return weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
    })),
  );
}

async function getAuthenticatedActivity(token) {
  const query = `
    query ContributionCalendar($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "Umar-Ilyas-Portfolio",
    },
    body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL API responded with ${response.status}`);
  }

  const result = await response.json();
  if (result.errors?.length || !result.data?.user) {
    throw new Error("GitHub GraphQL API returned an invalid contribution payload");
  }

  const calendar = result.data.user.contributionsCollection.contributionCalendar;
  return {
    contributionDays: createGraphQLContributionDays(calendar.weeks),
    totalContributions: calendar.totalContributions,
  };
}

export async function getGitHubActivity() {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      const authenticatedActivity = await getAuthenticatedActivity(token);

      return {
        username: GITHUB_USERNAME,
        ...authenticatedActivity,
        eventCount: authenticatedActivity.contributionDays.length,
        fetchedAt: new Date().toISOString(),
        error: null,
      };
    }

    const responses = await Promise.all(
      EVENT_PAGES.map((page) =>
        fetch(
          `${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=100&page=${page}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              "User-Agent": "Umar-Ilyas-Portfolio",
            },
            next: { revalidate: 3600 },
          },
        ),
      ),
    );

    for (const response of responses) {
      if (!response.ok) {
        throw new Error(`GitHub API responded with ${response.status}`);
      }
    }

    const pages = await Promise.all(
      responses.map((response) => response.json()),
    );
    const events = pages.flat();
    if (!pages.every((page) => Array.isArray(page))) {
      throw new Error("GitHub API returned an invalid activity payload");
    }

    const uniqueEvents = Array.from(
      new Map(events.map((event) => [event.id, event])).values(),
    );
    const contributionDays = createContributionDays(uniqueEvents);

    return {
      username: GITHUB_USERNAME,
      contributionDays,
      totalContributions: contributionDays.reduce(
        (total, day) => total + day.count,
        0,
      ),
      eventCount: uniqueEvents.length,
      fetchedAt: new Date().toISOString(),
      error: null,
    };
  } catch (error) {
    console.error("Unable to fetch GitHub activity:", error);
    return {
      username: GITHUB_USERNAME,
      contributionDays: [],
      totalContributions: 0,
      eventCount: 0,
      fetchedAt: null,
      error: "GitHub activity is temporarily unavailable.",
    };
  }
}
