"use client";
import { useState } from "react";
import { SpinWheel } from "./components/SpinWheel";
import { WordsList } from "./components/WordsList";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { Modal } from "./components/Modal";

export default function Home() {
  const [sectors, setSectors] = useState<any>([
    { label: "Apple" },
    { label: "Summer" },
    { label: "Sport" },
    { label: "Teacher" },
  ]);

  const [wordsModal, setWordsModal] = useState(false);
  return (
    <>
      <div className="h-screen flex items-center flex-col justify-center gap-4">
        <h2 className="text-5xl font-normal text-slate-700 uppercase tracking-wider ">
          Spin to Learn
        </h2>

        <div className="flex items-center justify-center">
          <SpinWheel sectors={sectors} />
        </div>

        <div className="mt-8">
          <HiOutlinePencilAlt
            size={35}
            className="cursor-pointer"
            onClick={() => setWordsModal(true)}
          />
        </div>
      </div>
      <Modal open={wordsModal} setOpen={setWordsModal}>
        <WordsList sectors={sectors} setSectors={setSectors} />
      </Modal>
    </>
  );
}
