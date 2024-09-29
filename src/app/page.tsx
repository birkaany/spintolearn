"use client";
import { useState } from "react";
import { SpinWheel } from "./components/SpinWheel";
import { WordsList } from "./components/WordsList";

export default function Home() {
  const [sectors, setSectors] = useState([
    { color: "#b0f", label: "100" },
    { color: "#f0b", label: "5" },
    { color: "#bf0", label: "500" },
    { color: "#fb0", label: "10" },
    { color: "#0b0", label: "1000" },
    { color: "#0f0", label: "50" },
  ]);
  console.log(sectors);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="grid grid-cols-2">
        <SpinWheel sectors={sectors} />
        <WordsList sectors={sectors} setSectors={setSectors} />
      </div>
    </div>
  );
}
