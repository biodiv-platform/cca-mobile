import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { useWatchPosition } from "@hooks/use-geolocation";
import notification from "@utils/notification";
import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import CurrentLocation from "./current";

interface NativeLocationProps {
  onChange?;
  onViewPortChange?;
}

export default function NativeLocation({ onChange, onViewPortChange }: NativeLocationProps) {
  const { currentPosition, startWatch, clearWatch } = useWatchPosition();
  const { t } = useTranslation();
  const [accuracy, setAccuracy] = useState<any>();

  const [position, setPosition] = useState<any>([]);

  const handleOnWatchToggle = async () => {
    if (currentPosition) {
      clearWatch();
      if (onChange && position.length > 2) {
        onChange({
          type: "Polygon",
          properties: { id: new Date().getTime() },
          coordinates: [[...position, position[0]]]
        });
      } else {
        notification(t("form.trace.polygon_required"));
      }
      setPosition([]);
    } else {
      startWatch();
    }
  };

  useEffect(() => {
    if (currentPosition) {
      setAccuracy(currentPosition.coords.accuracy);
      setPosition([
        ...position,
        [currentPosition.coords.longitude, currentPosition.coords.latitude]
      ]);
    }
  }, [currentPosition]);

  useEffect(() => {
    if (position.length) {
      onChange({
        type: "LineString",
        properties: { id: new Date().getTime() },
        coordinates: position.length > 1 ? position : [...position, ...position]
      });
    }
  }, [position]);

  return (
    <ErrorBoundary fallback={null}>
      <ButtonGroup mb={4}>
        <Button
          hidden={true}
          colorScheme={position.length ? "red" : "blue"}
          onClick={handleOnWatchToggle}
        >
          {position.length ? t("form.trace.stop") : t("form.trace.start")}
        </Button>
        <CurrentLocation onViewPortChange={onViewPortChange} />
      </ButtonGroup>

      <Box mb={4} hidden={true}>
        {accuracy && `${t("form.trace.accuracy")}: ± ${Number(accuracy).toFixed(0)} m`}
      </Box>
    </ErrorBoundary>
  );
}
