import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  GridItem,
  Input,
  SimpleGrid
} from "@chakra-ui/react";
import AddIcon from "@icons/add";
import DeleteIcon from "@icons/delete";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormLabel } from "./common";

interface IOptionsProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  isRequired?: boolean;
  hidden?;
  isLargeVariant?;
}

export const OptionsField = ({
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
  isLargeVariant,
  ...props
}: IOptionsProps) => {
  const { formState, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name });
  const { t } = useTranslation();

  const add = () => append({ label: "", value: "" });

  return (
    <FormControl
      isInvalid={!!formState?.errors?.[name]}
      mb={mb}
      hidden={hidden}
      isRequired={isRequired}
      id={name}
      {...props}
    >
      <FormLabel
        isLargeVariant={isLargeVariant}
        title={title}
        label={label}
        name={name}
        helpText={helpText}
      />
      <div>
        {fields.map((field, index) => (
          <SimpleGrid spacing={4} columns={7} key={field.id} mb={4}>
            <GridItem colSpan={3}>
              <Input
                {...register(`${name}.${index}.label`)}
                placeholder={t("form.options.label")}
                bg="white"
              />
              <FormErrorMessage children={formState.errors[`${name}.${index}.label`]?.toString()} />
            </GridItem>
            <GridItem colSpan={3}>
              <Input
                {...register(`${name}.${index}.value`)}
                placeholder={t("form.options.value")}
                bg="white"
              />
              <FormErrorMessage children={formState.errors[`${name}.${index}.value`]?.toString()} />
            </GridItem>
            <Button
              colorScheme="red"
              type="button"
              onClick={() => remove(index)}
              leftIcon={<DeleteIcon />}
            >
              {t("common.delete")}
            </Button>
          </SimpleGrid>
        ))}
        <Button colorScheme="green" leftIcon={<AddIcon />} type="button" onClick={add}>
          {t("common.add")}
        </Button>
      </div>
      <FormErrorMessage children={formState?.errors?.[name]?.message?.toString()} />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};
