/**
 * 点字文字クリップボードコピーユーティリティ
 */

import { Result } from "@praha/byethrow";
import { toast } from "sonner";

/**
 * 点字文字をクリップボードにコピーする
 * @param char - コピーする点字文字
 * @returns Promise<void>
 */
export const copyBrailleToClipboard = async (char: string): Promise<void> => {
  const result = await Result.try({
    immediate: true,
    try: () => navigator.clipboard.writeText(char),
    catch: (error) => new Error("Failed to copy to clipboard", { cause: error }),
  });

  if (Result.isSuccess(result)) {
    toast.success("コピーしました", {
      description: <span className="text-3xl font-bold">{char}</span>,
    });
  } else {
    console.error("Failed to copy to clipboard:", result.error);
    toast.error("コピーに失敗しました");
  }
};
