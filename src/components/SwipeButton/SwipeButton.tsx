import { useRef, useState } from "react";
import s from "./SwipeButton.module.scss";

const SwipeButton = () => {
  const [isSwiped, setIsSwiped] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(0);

  const handleTelegramLogin = () => {
    console.log("Login with Telegram");
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    console.log(touch);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleMove = (clientX: number) => {
    if (!sliderRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const sliderWidth = sliderRef.current.offsetWidth;
    const maxPosition = containerRect.width - sliderWidth;

    let newPosition = clientX - containerRect.left - sliderWidth / 2;
    newPosition = Math.max(0, Math.min(newPosition, maxPosition));

    setSliderPosition(newPosition);

    // Если пользователь довел до конца
    if (newPosition >= maxPosition - 10) {
      setIsSwiped(true);
      handleTelegramLogin();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    resetSlider();
  };

  const handleTouchEnd = () => {
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
    resetSlider();
  };

  const resetSlider = () => {
    if (isSwiped) return;
    setSliderPosition(0);
  };

  return (
    <div className={s.swipeContainer} ref={containerRef}>
      <div className={s.swipeTrack}>
        <span></span>
      </div>
      <div
        className={s.swipeSlider}
        ref={sliderRef}
        style={{ left: `${sliderPosition}px` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        Войти
      </div>
    </div>
  );
};

export default SwipeButton;
