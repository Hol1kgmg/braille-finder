"use client";

/**
 * 点字テーブルコンポーネント
 * 全256個の点字文字を16×16グリッドで表示
 */

import { BrailleGrid } from "./BrailleGrid";
import { useBrailleFilter } from "@/hooks/useBrailleFilter";

export const BrailleTable = () => {
  const { filteredData } = useBrailleFilter();

  return (
    <div className="flex flex-col items-start p-4">
      <BrailleGrid data={filteredData} />
    </div>
  );
};
