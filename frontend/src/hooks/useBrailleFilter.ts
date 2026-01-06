/**
 * 点字フィルタリングフック
 * Jotai atomを使用した検索状態管理
 */

import { useAtomValue, useSetAtom } from "jotai";
import type { DotNumber, FilteredBrailleCharacter } from "@/types";
import {
  selectedDotsAtom,
  toggleDotAtom,
  clearSelectionAtom,
  filteredBrailleAtom,
} from "@/atoms/braille";

/**
 * useBrailleFilterの戻り値型
 */
export type UseBrailleFilterReturn = {
  /** 現在選択されている点の配列 */
  readonly selectedDots: readonly DotNumber[];
  /** フィルタリング済み点字文字データ */
  readonly filteredData: readonly FilteredBrailleCharacter[];
  /** 点をトグルする関数 */
  readonly toggleDot: (dot: DotNumber) => void;
  /** 選択をクリアする関数 */
  readonly clearSelection: () => void;
};

/**
 * 点字フィルタリングフック
 *
 * @returns フィルタリング状態と操作関数
 * @example
 * const { selectedDots, filteredData, toggleDot, clearSelection } = useBrailleFilter();
 */
export const useBrailleFilter = (): UseBrailleFilterReturn => {
  const selectedDots = useAtomValue(selectedDotsAtom);
  const toggleDot = useSetAtom(toggleDotAtom);
  const clearSelection = useSetAtom(clearSelectionAtom);
  const filteredData = useAtomValue(filteredBrailleAtom);

  return {
    selectedDots,
    filteredData,
    toggleDot,
    clearSelection,
  };
};
