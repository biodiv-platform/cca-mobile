import { FormControl, FormErrorMessage, FormHelperText, Input } from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { FormInputControl, FormLabel } from "./common";

interface INumberInputProps {
  name: string;
  placeholder?: string;
  title?: string;
  label: string;
  helpText?: string;
  type?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  style?;
  maxLength?;
  isRequired?: boolean;
  hidden?;
  min?;
  max?;
  autoComplete?;
  isLargeVariant?;
}

export const NumberInputField = ({
  name,
  title,
  label,
  helpText,
  placeholder,
  mb = 4,
  disabled,
  hint,
  isRequired,
  hidden,
  min,
  max,
  isLargeVariant,
  ...props
}: INumberInputProps) => {
  const { field, fieldState } = useController({
    name,
    defaultValue: "" // to prevent uncontrolled to controlled error
  });

  const handleOnFieldChange = (e) => {
    const v = e.target.value;
    field.onChange(v ? Number(v) : null);
  };

  return (
    <FormControl
      isInvalid={!!fieldState.error}
      mb={mb}
      hidden={hidden}
      isRequired={isRequired}
      {...props}
    >
      <FormLabel
        isLargeVariant={isLargeVariant}
        title={title}
        label={label}
        name={name}
        helpText={helpText}
      />
      <FormInputControl isLargeVariant={isLargeVariant}>
        <Input
          id={name}
          placeholder={placeholder}
          type="number"
          isDisabled={disabled}
          bg="white"
          {...field}
          onChange={handleOnFieldChange}
        />
        <FormErrorMessage
          children={namedFormErrorMessage(fieldState?.error?.message, name, title)}
        />
        {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
      </FormInputControl>
    </FormControl>
  );
};
