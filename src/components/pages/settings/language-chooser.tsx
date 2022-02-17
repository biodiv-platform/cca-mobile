import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageChooser({ onChange }: { onChange? }) {
  const { t, i18n } = useTranslation();

  const options = Object.entries(SITE_CONFIG.LANG.LIST).map(([value, { name: label }]) => ({
    label,
    value
  }));

  const handleOnLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    onChange && onChange(newLang);
  };

  return (
    <FormControl mb={4}>
      <FormLabel htmlFor="email">{t("settings.language")}</FormLabel>
      <Select defaultValue={i18n.resolvedLanguage} onChange={handleOnLanguageChange}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
