import "react-datepicker/dist/react-datepicker.css";

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import CalendarIcon from "@icons/calendar";
import { parseToDateObject } from "@utils/date";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import DatePicker from "react-datepicker";
import { useController } from "react-hook-form";

import { FormInputControl, FormLabel } from "./common";

interface IYearPickerBoxProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  isRequired?: boolean;
  isLargeVariant?;
  hasMaxDate?;
  isClearable?;
  min?;
  max?;
}

export const YearPickerField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  mb = 4,
  hint,
  disabled,
  isLargeVariant,
  hasMaxDate = true,
  isClearable,
  min,
  max,
  ...props
}: IYearPickerBoxProps) => {
  const { field, fieldState } = useController({ name });
  const maxDate = hasMaxDate ? new Date().setHours(23, 59, 59, 999) : null; // End of Day

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
        <InputGroup>
          <DatePicker
            id={name}
            selected={parseToDateObject(field.value)}
            onChange={field.onChange}
            showYearPicker={true}
            dateFormat="yyyy"
            customInput={<Input />}
            minDate={min}
            maxDate={max || maxDate}
            isClearable={isClearable}
            {...props}
          />
          <InputRightElement hidden={isClearable}>
            <label htmlFor={name} style={{ cursor: "pointer" }}>
              <CalendarIcon color="gray.300" />
            </label>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage
          children={namedFormErrorMessage(fieldState?.error?.message, name, title)}
        />
        {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
      </FormInputControl>
    </FormControl>
  );
};
