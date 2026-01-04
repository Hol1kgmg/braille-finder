/**
 * 点字関連の型定義
 * Branded Typesを使用して型安全性を向上
 */

/**
 * Branded Types用のシンボル型
 * プリミティブ型に名目的な型付けを行い、誤使用を防ぐ
 */
declare const BitPositionBrand: unique symbol;
declare const UnicodeBrand: unique symbol;
declare const BinaryPatternBrand: unique symbol;

/**
 * 点番号 (1-8)
 * 点字の6点または8点配置における点の番号
 */
export type DotNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/**
 * ビット位置 (0-7) - Branded type
 * Unicodeエンコーディングにおけるビット位置
 */
export type BitPosition = (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) & {
  readonly [BitPositionBrand]: typeof BitPositionBrand;
};

/**
 * 点字Unicode値 (0x2800-0x28FF) - Branded type
 * 点字パターンのUnicode範囲
 */
export type BrailleUnicode = number & {
  readonly [UnicodeBrand]: typeof UnicodeBrand;
};

/**
 * バイナリパターン (0-255) - Branded type
 * 8ビットで表現される点字パターン
 */
export type BinaryPattern = number & {
  readonly [BinaryPatternBrand]: typeof BinaryPatternBrand;
};

/**
 * マッチ結果
 * - exact: 完全一致
 * - match: 選択した点をすべて含む（追加の点がある場合も）
 * - none: 選択した点の一部が欠けている
 */
export type MatchResult = "exact" | "match" | "none";

/**
 * 点字文字データ
 */
export type BrailleCharacter = {
  /** Unicode値 (例: 0x2800) */
  unicode: BrailleUnicode;
  /** 点字文字 (例: '⠀') */
  char: string;
  /** ONの点番号配列 (例: [1, 5]) - 不変 */
  dots: readonly DotNumber[];
  /** ビットパターン (例: 17 = 0b00010001) */
  binary: BinaryPattern;
};

/**
 * ビット-点番号マッピング型
 * BitPositionからDotNumberへの読み取り専用マッピング
 */
export type BitToDotMap = {
  readonly [K in BitPosition]: DotNumber;
};
