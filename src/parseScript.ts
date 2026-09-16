export type SceneEffect =
  | "zoom-in"
  | "zoom-out"
  | "pan-left"
  | "pan-right"
  | "pan-up"
  | "pan-down"
  | "highlight"
  | "static";

export type Scene = {
  image: string;
  duration: number; // giây
  effect: SceneEffect;
  caption: string;
};

export type ParsedScript = {
  title: string;
  voiceoverFile: string;
  scenes: Scene[];
};

const VALID_EFFECTS: SceneEffect[] = [
  "zoom-in",
  "zoom-out",
  "pan-left",
  "pan-right",
  "pan-up",
  "pan-down",
  "highlight",
  "static",
];

/**
 * Phân tích nội dung script.txt theo định dạng:
 *
 * title: Tiêu đề video
 * voiceover: audio/voiceover.mp3
 *
 * [SCENE 1]
 * image: scene01.jpg
 * duration: 6
 * effect: zoom-in
 * caption: Vì sao người nằm lâu dễ bị teo cơ?
 *
 * [SCENE 2]
 * ...
 *
 * Hàm này thuần xử lý chuỗi (không dùng fs) để chạy được cả trong trình duyệt
 * (Remotion Studio) lẫn khi render qua GitHub Actions.
 */
export function parseScriptText(raw: string): ParsedScript {
  const lines = raw.split(/\r?\n/);

  let title = "";
  let voiceoverFile = "audio/voiceover.mp3";
  const scenes: Scene[] = [];

  let current: Partial<Scene> | null = null;

  const pushCurrent = () => {
    if (!current) return;
    if (!current.image || !current.duration || !current.caption) {
      throw new Error(
        `Một [SCENE] trong script.txt bị thiếu thông tin (cần đủ image, duration, caption). Kiểm tra lại: ${JSON.stringify(
          current
        )}`
      );
    }
    const effect = VALID_EFFECTS.includes(current.effect as SceneEffect)
      ? (current.effect as SceneEffect)
      : "zoom-in";
    scenes.push({
      image: current.image,
      duration: current.duration,
      effect,
      caption: current.caption,
    });
    current = null;
  };

  for (const lineRaw of lines) {
    const line = lineRaw.trim();
    if (!line) continue;

    if (line.startsWith("[SCENE")) {
      pushCurrent();
      current = {};
      continue;
    }

    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim().toLowerCase();
    const value = line.slice(sep + 1).trim();

    if (current) {
      if (key === "image") current.image = value;
      else if (key === "duration") current.duration = parseFloat(value);
      else if (key === "effect") current.effect = value as SceneEffect;
      else if (key === "caption") current.caption = value;
    } else {
      if (key === "title") title = value;
      else if (key === "voiceover") voiceoverFile = value;
    }
  }
  pushCurrent();

  if (scenes.length === 0) {
    throw new Error(
      "Không đọc được cảnh nào từ script.txt. Kiểm tra lại định dạng file (xem hướng dẫn trong README)."
    );
  }

  return { title, voiceoverFile, scenes };
}
