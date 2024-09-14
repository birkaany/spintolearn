"use client";

import clsx from "clsx";
import { Slice } from "./Slice";
import { useEffect, useState, useCallback } from "react";

export const Wheel = () => {
  const items = [
    "Apple",
    "Ocean",
    "Sunshine",
    "Whisper",
    "Rainbow",
    "Rain",
    "Cloud",
    "Winter",
    "Spring",
  ];

  const [number, setNumber] = useState(0);
  const [itemColors, setItemColors] = useState(items);
  const colors = ["#f6bd60", "#f7ede2", "#f5cac3", "#84a59d", "#f28482"];

  const handleSpin = () => {
    setNumber((prev) => prev + Math.ceil(Math.random() * 1000));
  };

  useEffect(() => {
    const getRandomColor = (prevColor: string) => {
      const availableColors = colors.filter((color) => color !== prevColor);
      return availableColors[
        Math.floor(Math.random() * availableColors.length)
      ];
    };
    const generatedColors = items.reduce((acc, _, index) => {
      if (index === 0) {
        acc.push(colors[Math.floor(Math.random() * colors.length)]);
      } else {
        acc.push(getRandomColor(acc[index - 1]));
      }
      return acc;
    }, [] as string[]);

    setItemColors(generatedColors);
  }, []);

  return (
    <div className="relative flex justify-center items-center p-2 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full ">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ">
        <div className="w-0 h-0 rotate-180 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-orange-700"></div>
      </div>
      <div
        className={clsx(
          "relative size-[600px] transition-transform duration-5000 ease-out "
        )}
        style={{
          transform: `rotate(${number && number}deg)`,
          transition: "transform 5s ease-in-out",
        }}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {items.map((item, index) => {
            const rotate = index * (360 / items.length);
            const skew = 90 - 360 / items.length;
            return (
              <Slice
                key={index}
                item={item}
                rotate={rotate}
                skew={skew}
                color={itemColors[index]}
                index={index}
              />
            );
          })}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={handleSpin}
          className={clsx(
            "w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white"
          )}
        >
          Spin
        </button>
      </div>
    </div>
  );
};
