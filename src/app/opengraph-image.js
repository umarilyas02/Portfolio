import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Umar Ilyas — Full-Stack Developer";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f5f3ee",
          color: "#161615",
          fontSize: 32,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, letterSpacing: 2 }}>
            UMAR ILYAS®
          </span>
          <span style={{ color: "#5a5a55" }}>
            BASED IN PAKISTAN — WORKING WORLDWIDE
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 110, lineHeight: 1 }}>Full-Stack</span>
          <span style={{ fontSize: 110, lineHeight: 1, paddingLeft: 160 }}>
            Developer
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#5a5a55",
          }}
        >
          <span>Next.js · React · PostgreSQL</span>
          <span>umarilyas.dev</span>
        </div>
      </div>
    ),
    size
  );
}
