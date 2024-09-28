"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export const SpinWheel = () => {
  const wheelRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [winner, setWinner] = useState(0);

  const sectors = [
    { color: "#b0f", label: "100" },
    { color: "#f0b", label: "5" },
    { color: "#bf0", label: "500" },
    { color: "#fb0", label: "10" },
    { color: "#0b0", label: "1000" },
    { color: "#0f0", label: "50" },
  ];

  const rand = (m: number, M: number) => Math.random() * (M - m) + m;
  const tot = sectors.length;
  const dia = 600;
  const rad = dia / 2;
  const PI = Math.PI;
  const TAU = 2 * PI;
  const arc = TAU / sectors.length;
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
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();
    // TEXT
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 30px sans-serif";
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

    // Accelerate
    if (isAccelerating) {
      setAngVel((prev) => (prev || angVelMin) * 1.06);
    }
    // Decelerate
    else {
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
    const ctx = wheelRef.current?.getContext<CanvasRenderingContext2D>("2d");
    if (ctx) {
      ctx.canvas.width = dia;
      ctx.canvas.height = dia;
      sectors.forEach((sector, i) => drawSector(ctx, sector, i));
    }
  }, []);

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
    <div className="inline-flex relative overflow-hidden">
      <canvas
        className="block"
        id="wheel"
        width={dia}
        height={dia}
        ref={wheelRef}
      ></canvas>
      <div
        style={{
          backgroundColor: sectors[getIndex()].color,
          borderColor: "#fff",
          borderStyle: "solid",
          borderWidth: "10px",
          borderRadius: "50%",
        }}
        className={clsx(
          'cursor-pointer flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-white text-black rounded-[50%] transition-[transform_0.5s] after:content-[""] after:absolute after:top-[-17px] after:border-[10px] after:border-[#fff] after:border-t-[0] after:border-b-[0] after:border-l-[10px] after:border-r-[10px] after:w-[20px] after:h-[20px] after:rotate-[-45deg]'
        )}
        onClick={handleSpin}
      >
        SPIN
      </div>
    </div>
  );
};
