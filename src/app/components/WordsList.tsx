"use client";
import { FaPlusCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

export const WordsList = ({
  sectors,
  setSectors,
}: {
  sectors: { label: string }[];
  setSectors: React.Dispatch<React.SetStateAction<{ label: string }[]>>;
}) => {
  return (
    <div className="flex flex-col gap-2 m-3">
      {sectors.map((sector, i) => (
        <div className="relative group" key={i}>
          <input
            className="p-2"
            type="text"
            defaultValue={sector.label}
            onChange={(e) => {
              const newSectors = [...sectors];
              newSectors[i].label = e.target.value;
              setSectors(newSectors);
            }}
          />
          <RxCrossCircled
            size={24}
            color="#001e38"
            className="absolute right-2 top-1/2 -translate-y-1/2 group-hover:block hidden cursor-pointer"
            onClick={() => {
              const newSectors = [...sectors];
              newSectors.splice(i, 1);
              setSectors(newSectors);
            }}
          />
        </div>
      ))}
      {sectors.length <= 10 && (
        <button
          className="p-2 w-full flex items-center justify-center"
          onClick={() => setSectors([...sectors, { label: "100" }])}
        >
          <FaPlusCircle size={24} color="#001e38" />
        </button>
      )}
    </div>
  );
};
