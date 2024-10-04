"use client";

import clsx from "clsx";

export const Modal = ({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) setOpen(false);
      }}
      className={clsx(
        "fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50",
        !open && "hidden"
      )}
    >
      <div className="bg-white min-w-[400px]  max-w-lg rounded-md p-8 relative">
        <div className="mb-4 flex flex-col">
          <h2 className="text-2xl font-semibold">Set up your words</h2>
          <p className="text-sm text-gray-700">
            You can set up to 10 words that will be shown to you in the wheel.
          </p>
        </div>
        <div>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-0 right-0 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
