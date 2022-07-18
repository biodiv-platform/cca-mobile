import { CheckIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import PageWrapper from "@components/core/page-wrapper";
import { Tab, Tabs } from "@components/core/simple-tabs";
import { SubmitButton } from "@components/form/submit-button";
import { yupResolver } from "@hookform/resolvers/yup";
import useParticipations from "@hooks/use-participations";
import { FORM_TYPE } from "@static/constants";
import { arrayOfSize, splitIntoGroups, toFlatSaveData } from "@utils/field";
import { buildValidationRules } from "@utils/validation";
import React, { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import * as Yup from "yup";

import { ParticipateFormFieldRenderer } from "./form-field-renderer";
import { FormNavigation } from "./navigation";

export default function ParticipateFormComponent({ template }) {
  const { t } = useTranslation();
  const history = useHistory();
  const [tabIndex, setTabIndex] = useState(0);
  const { trySingleDataSync } = useParticipations();

  const [formSchema, templateFields, templateGroups] = useMemo(() => {
    // groupFieldsEnabled
    const newFields = buildValidationRules(template.fields);
    const hForm = Object.fromEntries(
      newFields
        .filter((field) => field.type !== FORM_TYPE.HEADING)
        .map((field) => [field.fieldId, field.rule])
    );
    const groupFields = splitIntoGroups(newFields);
    const groupFieldsEnabled = arrayOfSize(groupFields.length);
    return [hForm, newFields, groupFields, groupFieldsEnabled];
  }, []);

  const hForm = useForm<any>({
    mode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(Yup.object().shape(formSchema))
  });

  const handleOnSubmit = async (values) => {
    const p = {
      id: new Date().getTime(),
      isPending: true,
      shortName: template.shortName,
      ccaFieldValues: toFlatSaveData(templateFields, values)
    };

    const { success, data } = await trySingleDataSync(p);
    history.replace(`/participate/saved/${success}/${data?.id || -1}`);
  };

  return (
    <PageWrapper title={`${template.name} (${template.shortName})`} showBackButton={true}>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)} className="pure-form" noValidate>
          <Tabs value={tabIndex} onChange={setTabIndex} id="s-tabs">
            {templateGroups.map(({ heading, fields }) => (
              <Tab key={heading?.fieldId} label={heading.name}>
                {fields.map((field) => (
                  <Box key={field.fieldId} borderBottom="1px solid" borderColor="gray.200" pt={4}>
                    <ParticipateFormFieldRenderer field={field} />
                  </Box>
                ))}
              </Tab>
            ))}
          </Tabs>
          <FormNavigation
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            totalSize={templateGroups.length}
          >
            <SubmitButton
              isLoading={hForm.formState.isSubmitting}
              leftIcon={<CheckIcon />}
              width="full"
            >
              {t("form.submit")}
            </SubmitButton>
          </FormNavigation>
        </form>
      </FormProvider>
    </PageWrapper>
  );
}
