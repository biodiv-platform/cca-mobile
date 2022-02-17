import { FormControl, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import QuillInput from "@components/core/quill-input";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { FormInputControl, FormLabel } from "./common";

interface IRichTextAreaFieldProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mt?: number;
  mb?: number;
  hint?: string;
  isLargeVariant?;
}

const RichTextAreaField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  mb = 4,
  hint,
  isLargeVariant,
  ...props
}: IRichTextAreaFieldProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <FormControl isInvalid={fieldState.invalid} mb={mb} {...props}>
      <FormLabel
        isLargeVariant={isLargeVariant}
        title={title}
        label={label}
        name={name}
        helpText={helpText}
      />
      <FormInputControl isLargeVariant={isLargeVariant}>
        <QuillInput value={field.value} onChange={field.onChange} />
      </FormInputControl>

      <FormErrorMessage children={namedFormErrorMessage(fieldState?.error?.message, name, title)} />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};

export default RichTextAreaField;
