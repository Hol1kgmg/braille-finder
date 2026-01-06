/**
 * 点字検索用のJotai Atom定義
 * グローバル状態管理
 */

import { atom } from "jotai";
import type { DotNumber, FilteredBrailleCharacter } from "@/types";
import { matchPattern, generateBrailleData } from "@/lib/braille";

/**
 * 選択中の点番号を管理するatom
 * 初期値: 空配列（全て表示）
 */
export const selectedDotsAtom = atom<readonly DotNumber[]>([]);

/**
 * 選択中の点番号を更新するための書き込み専用atom
 * 点のトグル操作を管理
 */
export const toggleDotAtom = atom(null, (get, set, dotNumber: DotNumber): void => {
  const currentDots = get(selectedDotsAtom);
  const newDots = currentDots.includes(dotNumber)
    ? currentDots.filter((d) => d !== dotNumber)
    : Object.freeze([...currentDots, dotNumber].sort((a, b) => a - b) as DotNumber[]);

  set(selectedDotsAtom, newDots);
});

/**
 * 選択をクリアするための書き込み専用atom
 */
export const clearSelectionAtom = atom(null, (_get, set): void => {
  set(selectedDotsAtom, []);
});

/**
 * 全256文字の点字データ（定数）
 * アプリケーション起動時に一度だけ生成される
 */
const ALL_BRAILLE_CHARACTERS = Object.freeze(generateBrailleData());

/**
 * フィルタリング済み点字データの派生atom（グローバル）
 * selectedDotsAtomの変更に応じて自動的に再計算される
 */
export const filteredBrailleAtom = atom((get): readonly FilteredBrailleCharacter[] => {
  const selectedDots = get(selectedDotsAtom);

  return ALL_BRAILLE_CHARACTERS.map((char) => ({
    ...char,
    matchResult: matchPattern(char.dots, selectedDots),
  }));
});
