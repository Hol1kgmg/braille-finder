"use client";

/**
 * スクロールボタンコンポーネント
 * ページ上部にいない時、ページ上部へ戻るボタンを表示
 */

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./button";

/**
 * スクロール位置を監視してボタンの表示/非表示を制御するフック
 * @returns ボタンの表示状態
 */
const useScrollPosition = (): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期状態を設定

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isVisible;
};

export const ScrollToButton = () => {
  const isVisible = useScrollPosition();

  const handleClick = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className="fixed bottom-8 right-8 h-12 w-12 rounded-full shadow-lg transition-all hover:scale-110"
      aria-label="ページ上部へ移動"
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  );
};
