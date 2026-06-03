import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Arunraj A — Senior Angular Developer | Frontend Engineer | Kochi";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080808",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          border: "4px solid #111111",
          padding: "60px",
        }}
      >
        {/* Subtle decorative dot grid style */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(circle, rgba(232, 255, 58, 0.06) 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
            opacity: 0.8,
            zIndex: 1,
            width: "100%",
            height: "100%",
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            zIndex: 2,
          }}
        >
          {/* Monogram Box */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "180px",
              height: "180px",
              backgroundColor: "#111111",
              border: "2px solid #E8FF3A",
              marginRight: "60px",
              position: "relative",
            }}
          >
            {/* Monogram text */}
            <span
              style={{
                fontSize: "72px",
                fontWeight: 900,
                color: "#E8FF3A",
                letterSpacing: "-0.05em",
              }}
            >
              AR
            </span>
            {/* Small accent corner frame */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                right: "10px",
                bottom: "10px",
                border: "1px solid rgba(232, 255, 58, 0.25)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Details Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
            }}
          >
            {/* Header label */}
            <div
              style={{
                fontSize: "14px",
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#E8FF3A",
                marginBottom: "16px",
                fontWeight: "bold",
              }}
            >
              PORTFOLIO // FE ENGINEER
            </div>

            {/* Name */}
            <div
              style={{
                fontSize: "64px",
                fontWeight: 900,
                color: "#F5F5F5",
                textTransform: "uppercase",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}
            >
              Arunraj A
            </div>

            {/* Subtitle / Role info */}
            <div
              style={{
                fontSize: "22px",
                color: "#888888",
                lineHeight: 1.4,
                maxWidth: "750px",
              }}
            >
              Senior Angular Developer • Frontend Engineer
            </div>
            
            <div
              style={{
                fontSize: "16px",
                color: "#E8FF3A",
                fontFamily: "monospace",
                marginTop: "16px",
                opacity: 0.8,
              }}
            >
              17+ SPAs • Angular Migration Expert • Azure DevOps CI/CD
            </div>
          </div>
        </div>

        {/* Dynamic bottom branding border */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "60px",
            right: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "20px",
            zIndex: 2,
            width: "1080px",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "12px",
              color: "#888888",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            KOCHI, KERALA, INDIA
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "12px",
              color: "#E8FF3A",
              fontWeight: "bold",
            }}
          >
            arunraj.dev
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
