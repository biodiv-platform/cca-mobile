import { WarningIcon } from "@chakra-ui/icons";
import { List, ListItem } from "@chakra-ui/react";
import flat from "flat";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function ErrorSummery({ fieldIdMap = {} }) {
  const {
    formState: { errors }
  } = useFormContext();

  const readableError = (key, error) => {
    const newKey = key.replace(".message", "");
    return error && error?.replace(newKey, `${fieldIdMap[newKey]}`);
  };

  return (
    <List spacing={2} mb={4} mt={4}>
      {Object.entries(flat(errors))
        .filter(([key]) => key.endsWith(".message"))
        .map(([key, error]) => (
          <ListItem className="fade" key={key}>
            <WarningIcon mr={2} color="red.500" />
            {readableError(key, error)}
          </ListItem>
        ))}
    </List>
  );
}
