import { EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { FORM_TYPE } from "@static/constants";
import React from "react";
import { useTranslation } from "react-i18next";

import FieldEditor from "./field-editor";
import FieldShow from "./field-show";
import useDataEdit from "./use-data-edit";

export const FieldEditContainer = ({ field }) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useDataEdit();

  return (
    <Box mb={4} _hover={isOpen ? {} : { background: "gray.100" }}>
      {isOpen ? (
        <FieldEditor field={field} onClose={onClose} />
      ) : (
        <>
          <Box hidden={field.type === FORM_TYPE.HEADING} fontSize="xl" fontWeight="bold">
            {field.name}

            <IconButton
              alignItems="center"
              colorScheme="blue"
              aria-label={t("common.edit")}
              title={t("common.edit")}
              onClick={onOpen}
              icon={<EditIcon />}
              variant="link"
            />
          </Box>
          <FieldShow field={field} response={data} />
        </>
      )}
    </Box>
  );
};
