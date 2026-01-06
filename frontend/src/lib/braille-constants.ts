/**
 * 点字関連の定数定義
 */

import type { DotNumber } from "@/types";

/**
 * 点字の標準配置
 * 1 4
 * 2 5
 * 3 6
 * 7 8
 *
 * 配列順: 左上から左下 (1,2,3,7)、次に右上から右下 (4,5,6,8)
 * この配置は2×4グリッドでの表示に最適化されている
 */
export const DOT_POSITIONS: readonly DotNumber[] = Object.freeze([1, 4, 2, 5, 3, 6, 7, 8]);
