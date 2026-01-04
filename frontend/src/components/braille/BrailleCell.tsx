"use client";

/**
 * 点字セルコンポーネント
 * 個別の点字文字とそのドットパターンを表示
 */

import type { BrailleCellProps, DotNumber } from "@/types";

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

export const BrailleCell = ({ dots, isSelected: _isSelected, onClickAction }: BrailleCellProps) => {
  return (
    <div
      onClick={onClickAction}
      className="flex flex-col items-center justify-center gap-1 rounded border border-braille-cell-border bg-braille-cell-bg p-2 transition-colors hover:border-braille-cell-hover-border hover:bg-braille-cell-hover-bg"
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
