import React from "react";
import { WhiteBlock } from "../white-block";
import { Input } from "../../ui";
import { FormTextarea } from "../form/form-textarea";
import { AddressInput } from "../react-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../form/error-text";

type Props = {
  className?: string;
  disabled?: boolean;
};

export const CheckoutAddressForm = ({ className, disabled }: Props) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock className={className} title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />
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
