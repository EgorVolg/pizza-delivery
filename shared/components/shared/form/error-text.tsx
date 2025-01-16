import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  text: string;
  className?: string;
}
// export const RequiredSymbol = <span className="text-red-500">*</span>;

export const ErrorText: React.FC<Props> = ({ text, className }) => {
  return <p className={cn("text-red-500 text-sm", className)}>{text}</p>;
};
