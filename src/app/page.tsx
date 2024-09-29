"use client";
import { useState } from "react";
import { SpinWheel } from "./components/SpinWheel";
import { WordsList } from "./components/WordsList";

export default function Home() {
  const [sectors, setSectors] = useState([
    { label: "apple" },
    { label: "orange" },
    { label: "orange" },
    { label: "orange" },
  ]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="grid grid-cols-[3fr_1fr] container w-full items-center justify-center ">
        <div className="flex items-center justify-center">
          <SpinWheel sectors={sectors} />
        </div>
        <div className="flex justify-center items-center">
          <WordsList sectors={sectors} setSectors={setSectors} />
        </div>
      </div>
    </div>
  );
}
