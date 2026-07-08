import { useEffect, useRef } from "react";

export const useClickHandler = (
  onSingleClick: () => void,
  onDoubleClick: () => void,
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleClick = () => {
    if (timerRef.current) clearTimeout(timerRef.current); 
    timerRef.current = setTimeout(onSingleClick, 250);
  };

  const handleDoubleClick = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onDoubleClick();
  };

  return { handleClick, handleDoubleClick };
};