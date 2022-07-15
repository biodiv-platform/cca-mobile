import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Flex,
  FormHelperText,
  FormLabel as FL,
  IconButton,
  Input,
  useDisclosure,
  useFormControlContext
} from "@chakra-ui/react";
import { isOthersField } from "@utils/field";
import React, { useMemo } from "react";
import { useController } from "react-hook-form";

const RequiredIndicator = () => {
  const { isRequired } = useFormControlContext();

  return isRequired ? <chakra.span __css={{ color: "red.500" }} ml={1} children="*" /> : null;
};

export function FormLabel({ title, label, name, helpText, isLargeVariant }) {
  const { isOpen, onToggle } = useDisclosure();

  return isLargeVariant ? (
    <>
      {(label || title) && (
        <>
          <Flex fontWeight="bold" alignItems="top" mb={1.5}>
            <div>
              <IconButton
                disabled={!helpText}
                variant="link"
                type="button"
                minWidth="auto"
                aria-label="toggle"
                icon={<InfoOutlineIcon />}
                onClick={onToggle}
                m={3}
                ml={2}
                mt={1}
              />
            </div>
            <div>
              <chakra.label
                fontWeight="normal"
                display="block"
                htmlFor={name}
                mb={0}
                whiteSpace="pre-line"
              >
                <Box fontWeight="bold">
                  {title}
                  <RequiredIndicator />
                </Box>
                {label || title}
              </chakra.label>
            </div>
          </Flex>
        </>
      )}
      {isOpen && (
        <Box
          bg="gray.700"
          className="fade"
          mb={2}
          py={3}
          px={10}
          position="relative"
          borderRadius="md"
        >
          <Box
            bg="gray.700"
            position="absolute"
            top={-1.5}
            left={3}
            boxSize="12px"
            transform="rotate(45deg)"
          />
          <FormHelperText m={0} color="white" whiteSpace="pre-line" children={helpText} />
        </Box>
      )}
    </>
  ) : label ? (
    <FL htmlFor={name} mb={0} whiteSpace="pre-line">
      {label}
    </FL>
  ) : null;
}

export const FormInputControl = ({ children, isLargeVariant }) => (
  <Box px={isLargeVariant ? 4 : 0} children={children} />
);

export const OthersInput = ({ name, value }) => {
  const { field } = useController({ name: `others.${name}` });

  const showOthers = useMemo(() => {
    if (!value) return false;

    return Array.isArray(value) ? value?.find((v) => isOthersField(v)) : isOthersField(value);
  }, [value]);

  return showOthers ? <Input mt={4} {...field} /> : null;
};
