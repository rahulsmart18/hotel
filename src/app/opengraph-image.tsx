import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

export const runtime = "edge";

export const alt = SITE.name;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0a0a0c 0%, #121018 45%, #1a1510 100%)",
          color: "#f4f1ea",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#c9a962",
            marginBottom: 24,
          }}
        >
          Fine dining
        </div>
        <div style={{ fontSize: 96, fontWeight: 500, letterSpacing: "-0.04em" }}>
          {SITE.name}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            maxWidth: 720,
            textAlign: "center",
            color: "rgba(244,241,234,0.78)",
            lineHeight: 1.35,
          }}
        >
          {SITE.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
