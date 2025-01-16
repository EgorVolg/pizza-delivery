import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput } from "../form/form-input";

type Props = {
  className?: string;
};

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock className={className} title="2. Персональные данные">
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="Имя" className="text-base" placeholder="Имя" />
        <FormInput name="Фамилия" className="text-base" placeholder="Фамилия" />
        <FormInput name="Email" className="text-base" placeholder="Email" />
        <FormInput name="Телефон" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
