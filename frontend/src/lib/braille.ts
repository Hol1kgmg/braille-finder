/**
 * 点字Unicode管理ユーティリティ
 * Unicode範囲: U+2800 ~ U+28FF (256文字)
 */

import type { BrailleCharacter, DotNumber, BinaryPattern, BitToDotMap, MatchResult } from "@/types";
import { createBitPosition, createBrailleUnicode, createBinaryPattern } from "./braille-guards";

/**
 * 点字Unicodeのビット配置
 * bit 0 (値1):   点1
 * bit 1 (値2):   点2
 * bit 2 (値4):   点3
 * bit 3 (値8):   点4
 * bit 4 (値16):  点5
 * bit 5 (値32):  点6
 * bit 6 (値64):  点7
 * bit 7 (値128): 点8
 */
const BIT_TO_DOT_MAP = {
  [createBitPosition(0)]: 1,
  [createBitPosition(1)]: 2,
  [createBitPosition(2)]: 3,
  [createBitPosition(3)]: 4,
  [createBitPosition(4)]: 5,
  [createBitPosition(5)]: 6,
  [createBitPosition(6)]: 7,
  [createBitPosition(7)]: 8,
} as const satisfies BitToDotMap;

/**
 * ビットパターンから点番号配列を取得
 * @param value - ビットパターン (0-255)
 * @returns ONになっている点の番号配列（昇順、読み取り専用）
 * @example getDots(createBinaryPattern(17)) // [1, 5] (0b00010001)
 */
export const getDots = (value: BinaryPattern): readonly DotNumber[] => {
  const dots: DotNumber[] = [];

  for (let bit = 0; bit < 8; bit++) {
    if (value & (1 << bit)) {
      const bitPos = createBitPosition(bit);
      dots.push(BIT_TO_DOT_MAP[bitPos]);
    }
  }

  return Object.freeze(dots.sort((a, b) => a - b));
};

/**
 * 点番号配列からビットパターンを取得
 * @param dots - 点番号配列 (例: [1, 5])
 * @returns ビットパターン (0-255)
 * @example getBinary([1, 5]) // BinaryPattern(17 = 0b00010001)
 */
export const getBinary = (dots: readonly DotNumber[]): BinaryPattern => {
  let binary = 0;

  for (const dot of dots) {
    const bit = Object.entries(BIT_TO_DOT_MAP).find(([, dotNum]) => dotNum === dot)?.[0];

    if (bit !== undefined) {
      binary |= 1 << Number(bit);
    }
  }

  return createBinaryPattern(binary);
};

/**
 * 全256文字の点字データを生成
 * @returns 点字文字データの配列
 */
export const generateBrailleData = (): BrailleCharacter[] => {
  const data: BrailleCharacter[] = [];

  for (let i = 0; i < 256; i++) {
    const binary = createBinaryPattern(i);
    data.push({
      unicode: createBrailleUnicode(0x2800 + i),
      char: String.fromCodePoint(0x2800 + i),
      dots: getDots(binary),
      binary,
    });
  }

  return data;
};

/**
 * 選択された点を含むかチェック
 * @param charDots - 点字文字の点配列
 * @param selectedDots - 選択中の点配列
 * @returns 完全一致='exact', すべて含む='match', 一部欠けている='none'
 */
export const matchPattern = (
  charDots: readonly DotNumber[],
  selectedDots: readonly DotNumber[],
): MatchResult => {
  if (selectedDots.length === 0) {
    return "match"; // 何も選択していない場合は全て候補
  }

  const hasAllSelectedDots = selectedDots.every((dot) => charDots.includes(dot));

  if (!hasAllSelectedDots) {
    return "none"; // 選択した点の一部が欠けている
  }

  if (charDots.length === selectedDots.length) {
    return "exact"; // 完全一致
  }

  return "match"; // すべて含むが追加の点がある
};
