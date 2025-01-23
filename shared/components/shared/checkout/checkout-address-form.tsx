import React from "react";
import { WhiteBlock } from "../white-block";
import { Input, Textarea } from "../../ui";
import { FormTextarea } from "../form/form-textarea";
import { FormInput } from "../form/form-input";

type Props = {
  className?: string;
};

export const CheckoutAddressForm = ({ className }: Props) => {
  return (
    <WhiteBlock className={className} title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <FormInput name="Адрес" className="text-base" placeholder="Адрес" />
        <FormTextarea
          name="Комментарий"
          rows={5}
          className="text-base"
          placeholder="Комментарий"
        />
      </div>
    </WhiteBlock>
  );
};
