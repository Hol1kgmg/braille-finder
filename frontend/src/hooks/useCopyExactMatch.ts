/**
 * 完全一致の点字文字をコピーするキーボードショートカットフック
 * Cmd+C (Mac) / Ctrl+C (Windows/Linux) で最初の完全一致文字をクリップボードにコピー
 */

import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { exactMatchCharacterAtom } from "@/atoms/braille";
import { copyBrailleToClipboard } from "@/lib/clipboard";

/**
 * 完全一致の点字文字をコピーするキーボードショートカットフック
 *
 * @example
 * useCopyExactMatch();
 */
export const useCopyExactMatch = (): void => {
  const exactMatch = useAtomValue(exactMatchCharacterAtom);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent): Promise<void> => {
      // Cmd+C (Mac) または Ctrl+C (Windows/Linux) を検出
      const isCopyShortcut = (event.metaKey || event.ctrlKey) && event.key === "c";

      if (!isCopyShortcut) {
        return;
      }

      if (!exactMatch) {
        // 完全一致がない場合は通常のブラウザコピー動作を許可
        return;
      }

      // 完全一致がある場合のみデフォルト動作を防止
      event.preventDefault();

      // クリップボードにコピー（共通化された関数を使用）
      await copyBrailleToClipboard(exactMatch.char);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [exactMatch]);
};
