/**
 * 型ガードとファクトリー関数
 * Branded Typesの生成と検証を行う
 */

import type { DotNumber, BitPosition, BrailleUnicode, BinaryPattern } from "@/types/braille";

/**
 * 型ガード：DotNumber (1-8)
 */
export const isDotNumber = (value: number): value is DotNumber => {
  return Number.isInteger(value) && value >= 1 && value <= 8;
};

/**
 * 型ガード：BitPosition (0-7)
 */
export const isBitPosition = (value: number): value is BitPosition => {
  return Number.isInteger(value) && value >= 0 && value <= 7 && (value as BitPosition) === value;
};

/**
 * 型ガード：BrailleUnicode (0x2800-0x28FF)
 */
export const isBrailleUnicode = (value: number): value is BrailleUnicode => {
  return Number.isInteger(value) && value >= 0x2800 && value <= 0x28ff;
};

/**
 * 型ガード：BinaryPattern (0-255)
 */
export const isBinaryPattern = (value: number): value is BinaryPattern => {
  return Number.isInteger(value) && value >= 0 && value <= 255;
};

/**
 * ファクトリー関数：BitPosition
 * @throws {Error} 値が範囲外の場合
 */
export const createBitPosition = (value: number): BitPosition => {
  if (!Number.isInteger(value) || value < 0 || value > 7) {
    throw new Error(`Invalid bit position: ${value}. Must be 0-7.`);
  }
  return value as BitPosition;
};

/**
 * ファクトリー関数：BrailleUnicode
 * @throws {Error} 値が範囲外の場合
 */
export const createBrailleUnicode = (value: number): BrailleUnicode => {
  if (!Number.isInteger(value) || value < 0x2800 || value > 0x28ff) {
    throw new Error(`Invalid braille unicode: 0x${value.toString(16)}. Must be 0x2800-0x28FF.`);
  }
  return value as BrailleUnicode;
};

/**
 * ファクトリー関数：BinaryPattern
 * @throws {Error} 値が範囲外の場合
 */
export const createBinaryPattern = (value: number): BinaryPattern => {
  if (!Number.isInteger(value) || value < 0 || value > 255) {
    throw new Error(`Invalid binary pattern: ${value}. Must be 0-255.`);
  }
  return value as BinaryPattern;
};

/**
 * 安全な配列操作：DotNumber配列の検証
 * @throws {Error} 不正な値が含まれている場合
 */
export const createDotNumbers = (values: number[]): DotNumber[] => {
  const validated = values.filter(isDotNumber);
  if (validated.length !== values.length) {
    const invalidValues = values.filter((v) => !isDotNumber(v));
    throw new Error(`Invalid dot numbers in array: ${invalidValues.join(", ")}. Must be 1-8.`);
  }
  return validated;
};

/**
 * 安全な配列操作：DotNumber配列の検証（読み取り専用）
 * @throws {Error} 不正な値が含まれている場合
 */
export const createReadonlyDotNumbers = (values: number[]): readonly DotNumber[] => {
  return Object.freeze(createDotNumbers(values));
};
