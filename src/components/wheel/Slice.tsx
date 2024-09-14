"use client";

import clsx from "clsx";

type SliceType = {
  item: string;
  rotate: number;
  skew: number;
  index: number;
  color: string;
};

export const Slice = ({ item, rotate, color, index }: SliceType) => {
  return (
    <div
      key={index}
      className={clsx(
        "absolute w-[220px] h-1/2 origin-bottom flex items-start pt-10 justify-center text-2xl"
      )}
      style={{
        clipPath: `polygon(0 0, 100% 0, 50% 100%)`,
        left: index === 0 ? "50%" : "190px",
        transform: index === 0 ? "translateX(-50%)" : `rotate(${rotate}deg)`,
        backgroundColor: color,
      }}
    >
      {item}
    </div>
  );
};
