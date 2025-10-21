import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.4), transparent 55%), radial-gradient(circle at 80% 30%, rgba(139, 92, 246, 0.45), transparent 50%), #050510",
          color: "#eaf0ff",
          padding: "72px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Space Grotesk', 'Inter', 'Segoe UI', sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-10%",
            background:
              "conic-gradient(from 90deg at 50% 50%, rgba(139, 92, 246, 0.08), rgba(34, 211, 238, 0.05), rgba(139, 92, 246, 0.08))",
            filter: "blur(120px)",
            zIndex: 0
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "28px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(234, 240, 255, 0.64)"
            }}
          >
            <span
              style={{
                width: "36px",
                height: "2px",
                background: "rgba(34, 211, 238, 0.6)",
                display: "inline-block"
              }}
            />
            A Website
          </span>
          <h1
            style={{
              marginTop: "36px",
              fontSize: "86px",
              lineHeight: 1.05,
              fontWeight: 600,
              background:
                "linear-gradient(90deg, rgba(139, 92, 246, 0.95), rgba(34, 211, 238, 0.9))",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 18px 42px rgba(17, 21, 56, 0.45)"
            }}
          >
            Exploring the Cosmos of Experience
          </h1>
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "28px",
            letterSpacing: "0.08em",
            color: "rgba(234, 240, 255, 0.72)",
            textTransform: "uppercase"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span>Galactic Digital Experiences</span>
            <span style={{ fontSize: "20px", letterSpacing: "0.2em", opacity: 0.7 }}>
              Neon · Glassmorphism · WebGL
            </span>
          </div>
          <div
            style={{
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(34, 211, 238, 0.35) 0%, rgba(139, 92, 246, 0.2) 45%, rgba(5, 5, 16, 0) 70%)",
              boxShadow: "0 0 60px rgba(139, 92, 246, 0.35)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "18%",
                borderRadius: "50%",
                border: "1px solid rgba(234, 240, 255, 0.18)",
                boxShadow:
                  "0 0 35px rgba(139, 92, 246, 0.35), inset 0 0 25px rgba(34, 211, 238, 0.2)",
                backdropFilter: "blur(3px)"
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "36%",
                borderRadius: "50%",
                background: "rgba(139, 92, 246, 0.45)",
                filter: "blur(12px)",
                opacity: 0.65
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
