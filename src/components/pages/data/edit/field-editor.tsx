import { Button, HStack } from "@chakra-ui/react";
import { SubmitButton } from "@components/form/submit-button";
import { ParticipateFormFieldRenderer } from "@components/pages/participate/form/form-field-renderer";
import { yupResolver } from "@hookform/resolvers/yup";
import useParticipations from "@hooks/use-participations";
import { reverseFlatSaveData, toFlatSaveData } from "@utils/field";
import notification, { NotificationType } from "@utils/notification";
import { generateValidationStatement } from "@utils/validation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import useDataEdit from "./use-data-edit";

export default function FieldEditor({ field, onClose }) {
  const { data, setData, template } = useDataEdit();
  const { trySingleDataSync } = useParticipations();
  const { t } = useTranslation();

  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape(Object.fromEntries([generateValidationStatement(field)]))
    ),
    defaultValues: reverseFlatSaveData(field, data?.ccaFieldValues?.[field.fieldId]?.value)
  });

  const handleOnSubmit = async (values) => {
    const payload = {
      id: data.id,
      shortName: template.shortName,
      isPending: data.isPending,
      ccaFieldValues: {
        ...(data?.ccaFieldValues || {}),
        ...toFlatSaveData([field], values)
      }
    };

    const r = await trySingleDataSync(payload);

    if (r.success) {
      notification(t("form.saved.success"), NotificationType.Success);
    } else {
      notification(t("form.saved.error"));
    }

    setData(r.data);
    onClose();
  };

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
        <ParticipateFormFieldRenderer field={field} />
        <HStack my={2}>
          <SubmitButton>{t("common.save")}</SubmitButton>
          <Button onClick={onClose}>{t("common.cancel")}</Button>
        </HStack>
      </form>
    </FormProvider>
  );
}
