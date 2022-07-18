import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Stack
} from "@chakra-ui/react";
import { namedFormErrorMessage, optionLabelShow } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { FormInputControl, FormLabel, OthersInput } from "./common";

interface ICheckboxListProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  options?;
  mt?: number;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  isLargeVariant?;
  isOthers?: boolean;
}

export const CheckboxListField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  options = [],
  mb = 4,
  hint,
  disabled,
  isLargeVariant,
  isOthers,
  ...props
}: ICheckboxListProps) => {
  const {
    field: { onChange, value },
    fieldState
  } = useController({ name });

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
        <CheckboxGroup defaultValue={value} onChange={onChange} isDisabled={disabled}>
          <Stack>
            {options.map((option) => (
              <Checkbox key={option.value} disabled={option?.isDisabled} value={option.value}>
                {optionLabelShow(option.label)}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>

        {isOthers && <OthersInput name={name} value={value} />}

        <FormErrorMessage
          children={namedFormErrorMessage(fieldState?.error?.message, name, title)}
        />
        {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
      </FormInputControl>
    </FormControl>
  );
};
