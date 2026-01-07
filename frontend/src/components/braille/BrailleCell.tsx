"use client";

/**
 * 点字セルコンポーネント
 * 個別の点字文字とそのドットパターンを表示
 */

import type { BrailleCellProps, MatchResult } from "@/types";
import { DOT_POSITIONS } from "@/lib/braille-constants";
import { copyBrailleToClipboard } from "@/lib/clipboard";

/**
 * MatchResultに応じたクラス名を取得
 * @param matchResult - マッチ結果
 * @returns Tailwind CSSクラス名
 */
const getMatchClassName = (matchResult: MatchResult): string => {
  switch (matchResult) {
    case "exact":
      return "bg-braille-match-exact-bg border-braille-match-exact-border";
    case "match":
      return "bg-braille-cell-bg border-braille-cell-border";
    case "none":
      return "bg-braille-match-none-bg border-braille-match-none-border opacity-40";
    default: {
      matchResult satisfies never;
      throw new Error(`Unsupported match result: ${String(matchResult)}`);
    }
  }
};

export const BrailleCell = ({ char, dots, matchResult = "match" }: BrailleCellProps) => {
  const handleClick = async (): Promise<void> => {
    await copyBrailleToClipboard(char);
  };

  const matchClassName = getMatchClassName(matchResult);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-1 rounded border p-2 transition-colors hover:border-braille-cell-hover-border hover:bg-braille-cell-hover-bg cursor-pointer ${matchClassName}`}
    >
      {/* ドットパターン表示 (2列×4行) */}
      <div className="grid grid-cols-2 gap-0.5">
        {DOT_POSITIONS.map((dotNum) => {
          const isOn = dots.includes(dotNum);
          return (
            <div
              key={dotNum}
              className={`h-1.5 w-1.5 rounded-full ${isOn ? "bg-braille-dot-on" : "bg-braille-dot-off"}`}
              aria-label={`Dot ${dotNum}: ${isOn ? "ON" : "OFF"}`}
            />
          );
        })}
      </div>
    </div>
  );
};
