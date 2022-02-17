import SITE_CONFIG from "@configs/site-config";
import { FORM_TYPE, OPTION_FORM_TYPES } from "@static/constants";

const postProcessValue = (field, value, othersValue?) => {
  // Does reverse lookup and sends label and value pair for option types
  // Also takes care of replacing others value with label
  if (OPTION_FORM_TYPES.includes(field.type)) {
    if (!value || value?.length === 0) {
      return value;
    }

    if (Array.isArray(value)) {
      const valueMulti = field.valueOptions.filter((opt) => value.includes(opt.value));

      return valueMulti.map((opt) =>
        isOthersField(opt.value) ? { ...opt, label: othersValue } : opt
      );
    }

    const valueSingle = field.valueOptions.find((opt) => value === opt.value);

    return isOthersField(valueSingle.value) ? { ...valueSingle, label: othersValue } : valueSingle;
  }

  if (field.type === FORM_TYPE.GEOMETRY && value?.length) {
    return {
      type: "FeatureCollection",
      features: value?.map((v) => ({
        type: "Feature",
        properties: {},
        geometry: {
          type: v.type,
          coordinates: v.coordinates
        }
      }))
    };
  }

  return value;
};

export const splitIntoGroups = (fieldList) => {
  const fieldGroupList: any[] = [];
  const fieldGroup: any = {
    heading: { fieldId: "Untitled", name: "Untitled", type: FORM_TYPE.HEADING },
    fields: []
  };

  fieldList.map((field) => {
    if (field.type === FORM_TYPE.HEADING) {
      if (fieldGroup.fields.length > 0) {
        fieldGroupList.push({ ...fieldGroup });
      }

      // reset
      fieldGroup.heading = field;
      fieldGroup.fields = [];
    } else {
      fieldGroup.fields.push(field);
    }
  });

  fieldGroupList.push({ ...fieldGroup });

  return fieldGroupList;
};

export const arrayOfSize = (size) => new Array(size).fill(0).map((_, index) => index);

export const isOthersField = (value) => value.replace(/\s/g, "").includes("|?");

export const optionLabelShow = (value) => value?.replace("|", " → ");

export function toFlatSaveData(fieldList, { others, ...fieldValues }) {
  const newFieldList = Object.fromEntries(fieldList.map((field) => [field.fieldId, field]));

  const ccaFieldValues = Object.entries(fieldValues).map(([fieldId, value]) => [
    fieldId,
    {
      fieldId,
      name: newFieldList[fieldId].name,
      type: newFieldList[fieldId].type,
      value: postProcessValue(newFieldList[fieldId], value, others?.[fieldId])
    }
  ]);

  return Object.fromEntries(ccaFieldValues);
}

export const namedFormErrorMessage = (message, name, title) =>
  title ? message?.replace(name, title) : message;

export const findTitleFromData = (data) => {
  return SITE_CONFIG.CCA.TITLE_FIELD_IDS.map((fId) => data?.ccaFieldValues?.[fId]?.value)?.[0];
};

export const flattenFields = (fields) => {
  const flatFields: any = [];

  fields.map((field) => {
    flatFields.push(field);
    if (field.children.length) {
      flatFields.push(...flattenFields(field.children));
    }
  });

  return flatFields;
};

export const reverseFlatSaveData = (field, value: any) => {
  let defaultValues: any = { [field.fieldId]: value, others: {} };

  if (OPTION_FORM_TYPES.includes(field.type)) {
    if (Array.isArray(value)) {
      const initialOptions: any[] = [];

      value.map((v) => {
        if (isOthersField(v.value)) {
          defaultValues = {
            ...defaultValues,
            others: { [field.fieldId]: v?.label }
          };
        } else {
          initialOptions.push(v.value);
        }
      });

      defaultValues = {
        ...defaultValues,
        [field.fieldId]: initialOptions
      };
    } else {
      defaultValues = {
        ...defaultValues,
        [field.fieldId]: value?.value,
        others: { [field.fieldId]: value?.label }
      };
    }
  } else if (field.type === FORM_TYPE.GEOMETRY) {
    defaultValues = { [field.fieldId]: value?.features?.map((f) => f?.geometry) };
  }

  return defaultValues;
};
