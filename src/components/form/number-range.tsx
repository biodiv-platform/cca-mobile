import { Flex, FormControl, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import { RangeInput } from "@components/core/range-input";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { FormInputControl, FormLabel } from "./common";

interface INumberRangeProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  style?;
  isRequired?: boolean;
  hidden?;
  step?;
  min?;
  max?;
  isLargeVariant?;
}

export const NumberRangeField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  mb = 4,
  disabled,
  hint,
  isRequired,
  hidden,
  step,
  min,
  max,
  isLargeVariant,
  ...props
}: INumberRangeProps) => {
  const { field, fieldState } = useController({
    name,
    defaultValue: [] // to prevent uncontrolled to controlled error
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
        <Flex alignItems="center" css={{ gap: "10px" }}>
          <RangeInput
            initialValue={field.value}
            onChange={field.onChange}
            min={min}
            max={max}
            inputProps={{ w: "100px" }}
          />
        </Flex>
        <FormErrorMessage
          children={namedFormErrorMessage(fieldState?.error?.message, name, title)}
        />
        {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
      </FormInputControl>
    </FormControl>
  );
};
