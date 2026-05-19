import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)",
          padding: 60,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255, 92, 0, 0.2)",
          }}
        />
        <p
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            margin: 0,
          }}
        >
          Visualise<span style={{ color: "#FF5C00" }}>.Co</span>
        </p>
        <p
          style={{
            fontSize: 28,
            color: "#a3a3a3",
            marginTop: 20,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          {siteConfig.tagline}
        </p>
        <p
          style={{
            fontSize: 20,
            color: "#FF5C00",
            marginTop: 32,
          }}
        >
          Video · Design · Social · Web
        </p>
      </div>
    ),
    { ...size }
  );
}
