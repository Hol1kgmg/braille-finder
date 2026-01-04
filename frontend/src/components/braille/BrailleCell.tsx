"use client";

/**
 * 点字セルコンポーネント
 * 個別の点字文字とそのドットパターンを表示
 */

import type { BrailleCellProps, DotNumber } from "@/types";
import { Result } from "@praha/byethrow";
import { toast } from "sonner";

/**
 * 点字の標準配置
 * 1 4
 * 2 5
 * 3 6
 * 7 8
 *
 * 配列順: 左上から左下 (1,2,3,7)、次に右上から右下 (4,5,6,8)
 */
const DOT_POSITIONS: readonly DotNumber[] = [1, 4, 2, 5, 3, 6, 7, 8];

export const BrailleCell = ({ char, dots }: BrailleCellProps) => {
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

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center justify-center gap-1 rounded border border-braille-cell-border bg-braille-cell-bg p-2 transition-colors hover:border-braille-cell-hover-border hover:bg-braille-cell-hover-bg cursor-pointer"
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
