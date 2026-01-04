/**
 * コンポーネントProps型定義
 * 各Reactコンポーネントの型安全なProps定義
 */

import type { BrailleCharacter, DotNumber, MatchResult } from "./braille";

/**
 * BrailleCellコンポーネントのProps
 * 個別の点字セルを表示するコンポーネント
 */
export type BrailleCellProps = {
  /** 点字文字 */
  readonly char: string;
  /** 表示する点の番号配列 */
  readonly dots: readonly DotNumber[];
  /** 選択状態（オプション） */
  readonly isSelected?: boolean;
  /** クリック時のハンドラー（オプション） */
  readonly onClickAction?: () => void;
};

/**
 * BrailleGridコンポーネントのProps
 * 点字グリッドを表示するコンポーネント
 */
export type BrailleGridProps = {
  /** 表示する点字文字データの配列 */
  readonly data: readonly BrailleCharacter[];
  /** 現在選択されている点の配列 */
  readonly selectedDots: readonly DotNumber[];
  /** 点がトグルされた時のハンドラー */
  readonly onDotToggleAction: (dot: DotNumber) => void;
};

/**
 * BrailleTableコンポーネントのProps
 * 点字テーブル全体を管理するコンポーネント
 */
export type BrailleTableProps = {
  /** フィルタリングモード（オプション） */
  readonly filterMode?: MatchResult;
};
