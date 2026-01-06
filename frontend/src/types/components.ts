/**
 * コンポーネントProps型定義
 * 各Reactコンポーネントの型安全なProps定義
 */

import type { DotNumber, MatchResult, FilteredBrailleCharacter } from "./";

/**
 * BrailleCellコンポーネントのProps
 * 個別の点字セルを表示するコンポーネント
 */
export type BrailleCellProps = {
  /** 点字文字 */
  readonly char: string;
  /** 表示する点の番号配列 */
  readonly dots: readonly DotNumber[];
  /** マッチ結果（フィルタリング時） */
  readonly matchResult?: MatchResult;
};

/**
 * BrailleGridコンポーネントのProps
 * 点字グリッドを表示するコンポーネント
 */
export type BrailleGridProps = {
  /** 表示する点字文字データの配列（フィルタリング済み） */
  readonly data: readonly FilteredBrailleCharacter[];
};

/**
 * BraillePatternSelectorコンポーネントのProps
 * 検索パターン選択UI
 */
export type BraillePatternSelectorProps = {
  /** 現在選択されている点の配列 */
  readonly selectedDots: readonly DotNumber[];
  /** 点がクリックされた時のハンドラー */
  readonly onDotClickAction: (dot: DotNumber) => void;
  /** 選択クリアボタンのハンドラー */
  readonly onClearAction: () => void;
};
