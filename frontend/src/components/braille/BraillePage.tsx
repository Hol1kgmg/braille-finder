"use client";

import { TypographyH1, TypographyH2, TypographyLead, TypographyP } from "../ui/typography";
import { BrailleTable } from "./BrailleTable";
import { BraillePatternSelector } from "./BraillePatternSelector";
import { ScrollToButton } from "../ui/scroll-to-button";
import { useBrailleFilter } from "@/hooks/useBrailleFilter";

export const BraillePage = () => {
  const { selectedDots, toggleDot, clearSelection } = useBrailleFilter();

  return (
    <>
      <div className="flex flex-col items-start pb-20">
        <div className="flex flex-col mb-6 p-4">
          <TypographyH1>Braille Finder</TypographyH1>
          <TypographyH2 className="font-semibold">点字テキスト検索フォーム</TypographyH2>
          <TypographyP>全256個の点字文字をビジュアル検索（U+2800 〜 U+28FF）</TypographyP>
          <TypographyLead className="text-sm">
            点字セルをクリックすると文字をクリップボードにコピーできます
          </TypographyLead>
        </div>

        {/* 検索パターンセレクタ */}
        <div className="px-4 mb-4">
          <BraillePatternSelector
            selectedDots={selectedDots}
            onDotClickAction={toggleDot}
            onClearAction={clearSelection}
          />
        </div>

        {/* 点字テーブル */}
        <BrailleTable />
      </div>

      {/* スクロールボタン */}
      <ScrollToButton />
    </>
  );
};
