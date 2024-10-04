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
  const validateEmptySectors = () => {
    return sectors.every((sector) => sector.label !== "");
  };

  return (
    <div className="flex flex-col gap-2">
      {sectors.map((sector, i) => (
        <div className="relative group" key={i}>
          <input
            className="p-2 border border-gray-300 w-full"
            type="text"
            required
            defaultValue={sector.label}
            onChange={(e) => {
              const newSectors = [...sectors];
              newSectors[i].label = e.target.value;
              setSectors(newSectors);
            }}
          />
          {sectors.length > 4 && (
            <RxCrossCircled
              size={18}
              color="#001e38"
              className="absolute right-2 top-1/2 -translate-y-1/2 group-hover:block hidden cursor-pointer"
              onClick={() => {
                const newSectors = [...sectors];
                newSectors.splice(i, 1);
                setSectors(newSectors);
              }}
            />
          )}
        </div>
      ))}
      {sectors.length <= 10 && (
        <button
          className="p-2 w-full flex items-center justify-center"
          onClick={() => setSectors([...sectors, { label: "" }])}
        >
          <FaPlusCircle size={24} color="#001e38" />
        </button>
      )}
    </div>
  );
};
