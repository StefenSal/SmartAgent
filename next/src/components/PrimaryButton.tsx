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
        "group rounded-lg border-2 border-purple-500 bg-gradient-to-r from-purple-500 to-indigo-600 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:from-indigo-600 hover:to-purple-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-300/30 shadow-lg hover:shadow-purple-500/30",
        className
      )}
    >
      {icon}
      {children}
    </Button>
  );
}
