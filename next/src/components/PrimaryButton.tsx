import clsx from "clsx";
import type { ReactNode } from "react";
import React from "react";

import Button from "../ui/button";

type PrimaryButtonProps = {
  className?: string;
  children: ReactNode | string;
  icon?: React.ReactNode;
  onClick?: () => void | Promise<void>;
};

export default function PrimaryButton({ children, onClick, icon, className }: PrimaryButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={clsx(
        "group relative overflow-hidden rounded-xl border-none bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-[2px] text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25",
        className
      )}
    >
      <div className="relative h-full w-full rounded-xl bg-black px-6 py-3 transition-all duration-300 group-hover:bg-opacity-0">
        <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
          {icon}
          {children}
        </span>
      </div>
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 blur-xl" />
      </div>
    </Button>
  );
}
