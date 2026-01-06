"use client";

/**
 * 点字セルコンポーネント
 * 個別の点字文字とそのドットパターンを表示
 */

import type { BrailleCellProps, MatchResult } from "@/types";
import { Result } from "@praha/byethrow";
import { toast } from "sonner";
import { DOT_POSITIONS } from "@/lib/braille-constants";

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
    const result = await Result.try({
      immediate: true,
      try: () => navigator.clipboard.writeText(char),
      catch: (error) => new Error("Failed to copy to clipboard", { cause: error }),
    });

    if (Result.isSuccess(result)) {
      toast.success("コピーしました", {
        description: <span className="text-3xl font-bold">{char}</span>,
      });
    } else {
      console.error("Failed to copy to clipboard:", result.error);
      toast.error("コピーに失敗しました");
    }
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
