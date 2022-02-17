import { FormControl, FormErrorMessage, FormHelperText, Input } from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { FormInputControl, FormLabel } from "./common";

interface ITextBoxProps {
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
  autoComplete?;
  isLargeVariant?;
}

export const TextBoxField = ({
  name,
  title,
  label,
  helpText,
  placeholder,
  type = "text",
  mb = 4,
  disabled,
  hint,
  isRequired,
  maxLength,
  hidden,
  autoComplete,
  isLargeVariant,
  ...props
}: ITextBoxProps) => {
  const { field, fieldState } = useController({
    name,
    defaultValue: type === "number" ? undefined : "" // to prevent uncontrolled to controlled error
  });

  return (
    <FormControl
      isInvalid={fieldState.invalid}
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
          type={type}
          maxLength={maxLength}
          isDisabled={disabled}
          autoComplete={autoComplete}
          bg="white"
          {...field}
        />
        <FormErrorMessage
          children={namedFormErrorMessage(fieldState?.error?.message, name, title)}
        />
        {maxLength && field.value && (
          <FormHelperText color="gray.600" children={`${field.value.length}/${maxLength}`} />
        )}
        {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
      </FormInputControl>
    </FormControl>
  );
};
