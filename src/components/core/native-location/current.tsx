import { Button } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Geolocation } from "@capacitor/geolocation";

export default function CurrentLocation({ onViewPortChange }) {
  const { t } = useTranslation();

  const handleOnTraceRequest = async () => {
    try {
      const loc = await Geolocation.getCurrentPosition();
      onViewPortChange({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        zoom: 16
      });
    } catch (e) {
      console.error(e);
    }
  };

  return <Button onClick={handleOnTraceRequest}>{t("form.trace.current")}</Button>;
}
