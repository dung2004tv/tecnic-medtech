import React from "react";
import { Composition, staticFile } from "remotion";
import { TecnicVideo } from "./TecnicVideo";
import { parseScriptText, type ParsedScript } from "./parseScript";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TecnicVideo"
      component={TecnicVideo}
      fps={FPS}
      width={1080}
      height={1920}
      // Giá trị tạm ban đầu — sẽ được calculateMetadata tính lại chính xác
      durationInFrames={30 * 60}
      defaultProps={{ title: "", scenes: [], voiceoverFile: "audio/voiceover.mp3" } as ParsedScript}
      calculateMetadata={async () => {
        const res = await fetch(staticFile("script.txt"));
        const raw = await res.text();
        const parsed = parseScriptText(raw);
        const totalSeconds = parsed.scenes.reduce((sum, s) => sum + s.duration, 0);
        return {
          durationInFrames: Math.round(totalSeconds * FPS),
          props: parsed,
        };
      }}
    />
  );
};
