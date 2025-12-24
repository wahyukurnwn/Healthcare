"use client";

import { TextInput } from "./inputs/text-input";
import { DateInput } from "./inputs/date-input";
import { RadioInput } from "./inputs/radio-input";
import { SelectInput } from "./inputs/select-input";
import { Controller, Control } from "react-hook-form";
import { FormInputType } from "@/types/form-input-type";
import { PhoneInputNumber } from "./inputs/phone-input";
import { TextareaInput } from "./inputs/textarea-input";

interface FormFieldControllerProps {
  name: string;
  control: Control<any>;
  label?: string;
  type: FormInputType;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export function CustomFormField({ name, control, type, label, placeholder, options }: FormFieldControllerProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const commonProps = {
          field,
          error: fieldState.error,
          label,
          placeholder,
          options,
        };

        switch (type) {
          case "text":
          case "email":
            return <TextInput {...commonProps} />;

          case "phone":
            return <PhoneInputNumber {...commonProps} />;

          case "date":
            return <DateInput {...commonProps} />;

          case "radio":
            return <RadioInput {...commonProps} />;

          case "select":
            return <SelectInput {...commonProps} />;

          case "textarea":
            return <TextareaInput {...commonProps} />;

          default:
            return <></>;
        }
      }}
    />
  );
}
