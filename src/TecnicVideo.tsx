import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import type { ParsedScript } from "./parseScript";
import { KenBurnsImage } from "./KenBurnsImage";

const TOP_HEIGHT = 420; // vùng banner tiêu đề
const BOTTOM_HEIGHT = 480; // vùng banner CTA

export const TecnicVideo: React.FC<ParsedScript> = ({
  scenes,
  voiceoverFile,
}) => {
  const { fps, height } = useVideoConfig();
  const middleHeight = height - TOP_HEIGHT - BOTTOM_HEIGHT;

  let cursorFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Giọng đọc xuyên suốt video */}
      <Audio src={staticFile(voiceoverFile)} />

      {/* ===== VÙNG GIỮA: ảnh tĩnh + hiệu ứng zoom/pan theo từng cảnh ===== */}
      <AbsoluteFill style={{ top: TOP_HEIGHT, height: middleHeight }}>
        {scenes.map((scene, i) => {
          const durationInFrames = Math.round(scene.duration * fps);
          const from = cursorFrame;
          cursorFrame += durationInFrames;
          return (
            <Sequence key={i} from={from} durationInFrames={durationInFrames}>
              <AbsoluteFill>
                <KenBurnsImage
                  src={staticFile(`images/${scene.image}`)}
                  effect={scene.effect}
                  durationInFrames={durationInFrames}
                />
                <AbsoluteFill
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingBottom: 40,
                  }}
                >
                  <div
                    style={{
                      maxWidth: "88%",
                      background: "rgba(10,20,45,0.72)",
                      color: "#fff",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: 32,
                      lineHeight: 1.3,
                      textAlign: "center",
                      padding: "14px 22px",
                      borderRadius: 16,
                    }}
                  >
                    {scene.caption}
                  </div>
                </AbsoluteFill>
              </AbsoluteFill>
            </Sequence>
          );
        })}

        <Img
          src={staticFile("assets/logo_watermark.png")}
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            width: 130,
            opacity: 0.92,
          }}
        />
      </AbsoluteFill>

      {/* ===== VÙNG TRÊN: banner tiêu đề cố định ===== */}
      <AbsoluteFill style={{ height: TOP_HEIGHT }}>
        <Img
          src={staticFile("assets/top_banner.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {/* ===== VÙNG DƯỚI: banner CTA cố định ===== */}
      <AbsoluteFill style={{ top: TOP_HEIGHT + middleHeight, height: BOTTOM_HEIGHT }}>
        <Img
          src={staticFile("assets/bottom_cta.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
