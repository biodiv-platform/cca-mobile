import { FormControl, FormErrorMessage, FormHelperText, Textarea } from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { FormInputControl, FormLabel } from "./common";

interface ITextAreaProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  maxLength?;
  style?;
  isRequired?;
  isLargeVariant?;
}

export const TextAreaField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  mb = 4,
  disabled,
  maxLength,
  hint,
  isLargeVariant,
  ...props
}: ITextAreaProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <FormControl isInvalid={!!fieldState.error} mb={mb} {...props}>
      <FormLabel
        isLargeVariant={isLargeVariant}
        title={title}
        label={label}
        name={name}
        helpText={helpText}
      />
      <FormInputControl isLargeVariant={isLargeVariant}>
        <Textarea
          id={name}
          placeholder={label}
          minH="124px"
          isDisabled={disabled}
          bg="white"
          maxLength={maxLength}
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
