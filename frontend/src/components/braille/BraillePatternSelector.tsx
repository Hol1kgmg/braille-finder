"use client";

/**
 * 点字パターンセレクタコンポーネント
 * 2×4ドットグリッドで検索パターンを選択
 */

import { useEffect } from "react";
import type { DotNumber } from "@/types";
import { Kbd } from "@/components/ui/kbd";
import { DOT_POSITIONS } from "@/lib/braille-constants";

export type BraillePatternSelectorProps = {
  /** 現在選択されている点の配列 */
  readonly selectedDots: readonly DotNumber[];
  /** 点がクリックされた時のハンドラー */
  readonly onDotClickAction: (dot: DotNumber) => void;
  /** 選択クリアボタンのハンドラー */
  readonly onClearAction: () => void;
};

export const BraillePatternSelector = ({
  selectedDots,
  onDotClickAction,
  onClearAction,
}: BraillePatternSelectorProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Backspace" && selectedDots.length > 0) {
        event.preventDefault();
        onClearAction();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedDots.length, onClearAction]);

  return (
    <div className="flex flex-col gap-4 p-4 border border-border rounded-lg bg-card items-center">
      <div className="flex items-center justify-center gap-2 w-full">
        <h2 className="text-lg font-semibold">検索フォーム</h2>
      </div>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Kbd>Backspace</Kbd>/<Kbd>⌫</Kbd>
        <span>でクリア</span>
      </div>

      {/* 2×4 ドットグリッド */}
      <div className="grid grid-cols-2 gap-1 w-fit">
        {DOT_POSITIONS.map((dotNum) => {
          const isSelected = selectedDots.includes(dotNum);
          return (
            <button
              key={dotNum}
              onClick={() => onDotClickAction(dotNum)}
              className={`h-6 w-6 rounded-full border-2 transition-all ${
                isSelected
                  ? "bg-braille-dot-on border-braille-dot-on scale-110"
                  : "bg-braille-dot-off border-braille-cell-border hover:border-braille-cell-hover-border hover:scale-105"
              }`}
              aria-label={`Dot ${dotNum}: ${isSelected ? "選択中" : "未選択"}`}
              aria-pressed={isSelected}
            />
          );
        })}
      </div>
    </div>
  );
};
