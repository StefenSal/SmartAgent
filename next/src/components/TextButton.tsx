import clsx from "clsx";
import type { ReactNode } from "react";
import React from "react";

import Button from "../ui/button";

type TextButtonProps = {
  children: ReactNode | string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
};
export default function TextButton({ children, onClick, icon, className }: TextButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={clsx(
        "group rounded-lg px-4 py-2 bg-transparent text-gray-600 transition-all duration-200 ease-in-out hover:bg-purple-50 hover:text-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30",
        className
      )}
    >
      {icon}
      {children}
    </Button>
  );
}
