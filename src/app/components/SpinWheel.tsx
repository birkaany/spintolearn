"use client";

import { COLORS } from "@/constants/colors";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export const SpinWheel = ({ sectors }: { sectors: any }) => {
  const wheelRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [winner, setWinner] = useState(0);

  const darkenColor = (color: string, amount: number) => {
    let usePound = false;
    if (color[0] === "#") {
      color = color.slice(1);
      usePound = true;
    }

    const num = parseInt(color, 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00ff) + amount;
    let b = (num & 0x0000ff) + amount;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    return (
      (usePound ? "#" : "") +
      ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
    );
  };

  const rand = (m: number, M: number) => Math.random() * (M - m) + m;
  const tot = sectors?.length;
  const dia = 400;
  const rad = dia / 2;
  const PI = Math.PI;
  const TAU = 2 * PI;
  const arc = TAU / sectors?.length;
  const friction = 0.991;
  const angVelMin = 0.002;

  const [ang, setAng] = useState(0);
  const [angVel, setAngVel] = useState(0);
  const [angVelMax, setAngVelMax] = useState(0);

  const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

  const drawSector = (
    ctx: CanvasRenderingContext2D,
    sector: any,
    i: number
  ) => {
    const ang = arc * i;

    ctx.save();
    // COLOR
    ctx.beginPath();
    ctx.fillStyle = COLORS[i % 4]?.bg || "#000";
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();

    // STROKE
    ctx.strokeStyle = darkenColor(COLORS[i % 4]?.bg || "#000", -20);
    ctx.lineWidth = 4;
    ctx.stroke();

    // TEXT
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = COLORS[i % 4]?.text || "#fff";
    ctx.font = "bold 1.25rem sans-serif ";
    ctx.fillText(sector.label, rad - 10, 10);
    ctx.restore();
  };

  const rotate = () => {
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${ang - PI / 2}rad)`;
    }
  };

  const frame = () => {
    if (!isSpinning) return;

    if (angVel >= angVelMax) setIsAccelerating(false);

    if (isAccelerating) {
      setAngVel((prev) => (prev || angVelMin) * 1.06);
    } else {
      setAngVel((prev) => {
        const newAngVel = prev * friction;
        if (newAngVel < angVelMin) {
          setIsSpinning(false);
          const winnerIndex = getIndex();

          setWinner(winnerIndex);
          alert(`Kazanan: ${sectors[winnerIndex].label}`);

          return 0;
        }
        return newAngVel;
      });
    }

    setAng((prev) => (prev + angVel) % TAU);
  };

  useEffect(() => {
    const ctx = wheelRef.current?.getContext("2d");
    if (ctx) {
      ctx.canvas.width = dia;
      ctx.canvas.height = dia;
      sectors.forEach((sector: any, i: number) => drawSector(ctx, sector, i));
    }
  }, [sectors]);

  useEffect(() => {
    const intervalId = setInterval(frame, 1000 / 60);
    return () => clearInterval(intervalId);
  }, [isSpinning, isAccelerating, angVel, ang, angVelMax]);

  useEffect(() => {
    rotate();
  }, [ang]);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setIsAccelerating(true);
    setAngVelMax(rand(0.25, 0.4));
  };

  return (
    <>
      {sectors.length > 0 && (
        <div className="rounded-full border-[8px] border-[#fefefc] drop-shadow-2xl shadow-2xl ">
          <div className="inline-flex relative overflow-hidden border-[16px] border-[#001e38] rounded-full">
            <div className="bg-transparent z-20 absolute top-0 left-0 w-full h-full border-[5px] blur-sm rounded-full border-black"></div>

            <canvas
              className="block"
              id="wheel"
              width={dia}
              height={dia}
              ref={wheelRef}
            ></canvas>
            <button
              style={{
                backgroundColor: COLORS[getIndex() % 4]?.bg || "#000",
                color: COLORS[getIndex() % 4]?.text || "#fff",
                borderColor: "#fff",
                borderStyle: "solid",
                borderWidth: "10px",
                borderRadius: "50%",
              }}
              className={clsx(
                'cursor-pointer z-50 flex justify-center font-bold items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-[20%] bg-white text-black rounded-[50%] transition-[transform_0.5s] after:content-[""] after:absolute after:top-[-14px] after:border-[10px] after:border-[#fff] after:border-t-[0] after:border-b-[0] after:border-l-[5px] after:border-r-[5px] after:w-[10px] after:h-[10px] after:rotate-[-45deg] uppercase tracking-wider text-xs',
                {
                  "!size-[10%] after:border-l-[5px] after:border-r-[5px] after:w-[10px] after:h-[10px] after:top-[-13px] transition-[transform_2s]":
                    isSpinning,
                }
              )}
              onClick={handleSpin}
            >
              {!isSpinning && "Spin"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
