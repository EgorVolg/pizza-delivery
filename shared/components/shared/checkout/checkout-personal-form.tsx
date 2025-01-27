import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput } from "../form/form-input";

type Props = {
  className?: string;
  disabled?: boolean;
};

export const CheckoutPersonalForm: React.FC<Props> = ({
  className,
  disabled,
}) => {
  return (
    <WhiteBlock className={className} title="2. Персональные данные">
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="name" className="text-base" placeholder="Имя" />
        <FormInput name="lastName" className="text-base" placeholder="Фамилия" />
        <FormInput name="email" className="text-base" placeholder="Email" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
