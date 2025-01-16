import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../../ui";
import { ErrorText } from "./error-text";
import { ClearButton } from "./clear-button";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  // const {} = useFormContext();

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <ErrorText text="*" />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...props} />
        <ClearButton />
      </div>

      <ErrorText text="Поле обязательно для заполнения" className="mt-2" />
    </div>
  );
};
