"use client";

import { useState } from "react";

export const WordsList = ({
  sectors,
  setSectors,
}: {
  sectors: { color: string; label: string }[];
  setSectors: React.Dispatch<
    React.SetStateAction<{ color: string; label: string }[]>
  >;
}) => {
  return (
    <div className="flex flex-col gap-2 m-3">
      {sectors.map((sector, i) => (
        <input
          className="p-2"
          key={i}
          type="text"
          defaultValue={sector.label}
        />
      ))}
      <button
        onClick={() =>
          setSectors([...sectors, { color: "#b0f", label: "100" }])
        }
      >
        Add Sector
      </button>
    </div>
  );
};
