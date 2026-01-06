"use client";

/**
 * 点字グリッドコンポーネント
 * 16×16のグリッドで256個の点字文字を表示
 */

import type { BrailleGridProps } from "@/types";
import { BrailleCell } from "./BrailleCell";

export const BrailleGrid = ({ data }: BrailleGridProps) => {
  return (
    <div
      style={{
        width: "calc(var(--braille-grid-columns) * (var(--braille-cell-size) + var(--braille-gap))",
      }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(var(--braille-grid-columns), var(--braille-cell-size))",
          gap: "var(--braille-gap)",
        }}
      >
        {data.map((brailleChar) => (
          <BrailleCell
            key={brailleChar.unicode}
            char={brailleChar.char}
            dots={brailleChar.dots}
            matchResult={brailleChar.matchResult}
          />
        ))}
      </div>
    </div>
  );
};
