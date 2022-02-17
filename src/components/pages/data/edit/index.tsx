import { Box } from "@chakra-ui/react";
import { Tab, Tabs } from "@components/core/simple-tabs";
import { FormNavigation } from "@components/pages/participate/form/navigation";
import { flattenFields, splitIntoGroups } from "@utils/field";
import React, { useMemo, useState } from "react";

import { FieldEditContainer } from "./field-edit-container";
import useDataEdit from "./use-data-edit";

export default function DataEditComponent() {
  const { template } = useDataEdit();
  const [tabIndex, setTabIndex] = useState(0);

  const templateGroups = useMemo(() => {
    const _flattenFields = flattenFields(template?.fields);
    const _templateGroups = splitIntoGroups(_flattenFields);
    return _templateGroups;
  }, [template]);

  return (
    <div>
      <Tabs value={tabIndex} onChange={setTabIndex} id="s-tabs">
        {templateGroups.map(({ heading, fields }) => (
          <Tab key={heading?.fieldId} label={heading.name}>
            <Box p={4}>
              {fields.map((field) => (
                <FieldEditContainer field={field} key={field.fieldId} />
              ))}
            </Box>
          </Tab>
        ))}
      </Tabs>
      <FormNavigation
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        totalSize={templateGroups.length}
      />
    </div>
  );
}
