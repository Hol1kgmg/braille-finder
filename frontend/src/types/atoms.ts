/**
 * Atom関連の型定義
 */

import type { BrailleCharacter, MatchResult } from "./braille";

/**
 * フィルタリング結果を含む点字文字型
 */
export type FilteredBrailleCharacter = BrailleCharacter & {
  readonly matchResult: MatchResult;
};
