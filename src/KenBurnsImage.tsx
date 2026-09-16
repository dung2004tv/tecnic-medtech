import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import type { SceneEffect } from "./parseScript";

const KEN_BURNS_AMOUNT = 1.18; // mức zoom tối đa (18%)
const PAN_AMOUNT = 6; // phần trăm dịch chuyển khi pan

export const KenBurnsImage: React.FC<{
  src: string;
  effect: SceneEffect;
  durationInFrames: number;
}> = ({ src, effect, durationInFrames }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let brightness = 1;

  switch (effect) {
    case "zoom-in":
      scale = 1 + (KEN_BURNS_AMOUNT - 1) * progress;
      break;
    case "zoom-out":
      scale = KEN_BURNS_AMOUNT - (KEN_BURNS_AMOUNT - 1) * progress;
      break;
    case "pan-left":
      scale = KEN_BURNS_AMOUNT;
      translateX = PAN_AMOUNT * (1 - progress);
      break;
    case "pan-right":
      scale = KEN_BURNS_AMOUNT;
      translateX = -PAN_AMOUNT * (1 - progress);
      break;
    case "pan-up":
      scale = KEN_BURNS_AMOUNT;
      translateY = PAN_AMOUNT * (1 - progress);
      break;
    case "pan-down":
      scale = KEN_BURNS_AMOUNT;
      translateY = -PAN_AMOUNT * (1 - progress);
      break;
    case "highlight": {
      // nhấn nhẹ (pulse) ở giữa cảnh để gây chú ý
      const pulse = Math.sin(progress * Math.PI);
      scale = 1 + 0.06 * pulse;
      brightness = 1 + 0.12 * pulse;
      break;
    }
    case "static":
    default:
      scale = 1;
      break;
  }

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${translateX}%, ${translateY}%)`,
          filter: `brightness(${brightness})`,
        }}
      />
    </AbsoluteFill>
  );
};
