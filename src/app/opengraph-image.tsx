import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "QueStudio — websites that get calls and bookings";

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
          background: "#dce3eb",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 112,
              fontWeight: 800,
              color: "#10141a",
              letterSpacing: "-0.04em",
            }}
          >
            QueStudio
          </div>
          <div style={{ fontSize: 44, color: "#2a333d", marginTop: 12 }}>
            Sites that get calls and bookings.
          </div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            ["Presence", "$900"],
            ["Business", "$1,800"],
            ["Bookings", "$3,200"],
          ].map(([name, price]) => (
            <div
              key={name}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#f4f7fa",
                border: "1px solid rgba(16,20,26,0.12)",
                padding: "20px 28px",
                flex: 1,
              }}
            >
              <span style={{ fontSize: 26, color: "#5c6976" }}>{name}</span>
              <span style={{ fontSize: 52, fontWeight: 700, color: "#0a6e64" }}>
                {price}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
