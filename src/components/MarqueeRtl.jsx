import React, { useEffect, useMemo, useState } from "react";

export default function MarqueeRtl({ items = [], interval = 3000 }) {
  const safeItems = useMemo(
    () => items.map((item) => String(item || "").trim()).filter(Boolean),
    [items]
  );

  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  const carouselItems = safeItems.length > 1 ? [...safeItems, safeItems[0]] : safeItems;

  useEffect(() => {
    if (safeItems.length <= 1) return;

    const timer = setInterval(() => {
      setTransition(true);
      setIndex((prev) => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [safeItems.length, interval]);

  const handleTransitionEnd = () => {
    if (index === safeItems.length) {
      setTransition(false);
      setIndex(0);

      setTimeout(() => {
        setTransition(true);
      }, 50);
    }
  };

  if (!safeItems.length) return null;

  return (
    <div className="w-full overflow-hidden  text-black pt-2">
      <div className="overflow-hidden">
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`flex ${
            transition ? "transition-transform duration-700 ease-in-out" : ""
          }`}
          style={{
            width: `${carouselItems.length * 100}%`,
            transform: `translateX(-${index * (100 / carouselItems.length)}%)`,
          }}
        >
          {carouselItems.map((text, i) => (
            <div
              key={`${text}-${i}`}
              className="flex-shrink-0 flex items-center justify-center font-inter"
              style={{ width: `${100 / carouselItems.length}%` }}
            >
              <p className="whitespace-nowrap text-sm md:text-base font-medium">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}