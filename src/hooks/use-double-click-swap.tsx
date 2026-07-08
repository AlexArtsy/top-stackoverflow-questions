
import { useState } from "react";
import { SOQuestion } from "../model/types";

export const useDoubleClickSwap = (items: SOQuestion[], onSwap: (a: number, b: number) => void) => {
const [swapItemId, setSwapItemId] = useState<number | null>(null);

  const handleDoubleClick = (questionId: number) => {
    if (swapItemId === null) {
      setSwapItemId(questionId);
    } else if (swapItemId === questionId) {
      setSwapItemId(null);
    } else {
      const a = items.findIndex((q) => q.question_id === swapItemId);
      const b = items.findIndex((q) => q.question_id === questionId);
      onSwap(a, b);
      setSwapItemId(null);
    }
  };

  return { swapItemId, handleDoubleClick, clearSelection: () => setSwapItemId(null) };
};