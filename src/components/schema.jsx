export function SchemaScript() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Umar Ilyas",
    url: "https://umarilyas.dev",
    jobTitle: "Full Stack Developer",
    email: "umarilyas389@gmail.com",
    sameAs: [
      "https://github.com/umarilyas02",
      "https://twitter.com/umarilyas02",
      "https://linkedin.com/in/umarilyas",
    ],
    description:
      "Full Stack Developer specializing in React.js, Next.js, and modern web technologies",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "Docker",
      "Tailwind CSS",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
