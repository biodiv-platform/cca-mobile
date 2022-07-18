import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import NativeLocation from "@components/core/native-location";
import SITE_CONFIG from "@configs/site-config";
import { NakshaGmapsDraw, GMAP_FEATURE_TYPES } from "@ibp/naksha-gmaps-draw";
import { namedFormErrorMessage } from "@utils/field";
import { getMapCenter } from "@utils/location";
import React, { useRef, useState } from "react";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormInputControl, FormLabel } from "./common";

interface IGeometryProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  style?;
  isRequired?: boolean;
  hidden?;
  autoComplete?;
  isLargeVariant?;
}

const defaultViewPort = getMapCenter(2.8);

export const GeometryField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  mb = 4,
  disabled,
  hint,
  isRequired,
  isLargeVariant,
  ...props
}: IGeometryProps) => {
  const gmapsSearchRef = useRef<any>(null);
  const { t } = useTranslation();
  const { field, fieldState } = useController({ name, defaultValue: null });
  const mapRef = useRef<any>(null);
  const [viewPort, setViewPort] = useState(defaultViewPort);

  return (
    <FormControl isInvalid={!!fieldState.error} mb={mb} isRequired={isRequired} {...props}>
      <FormLabel
        isLargeVariant={isLargeVariant}
        title={title}
        label={label}
        name={name}
        helpText={helpText}
      />
      <FormInputControl isLargeVariant={isLargeVariant}>
        <Box position="relative">
          <NakshaGmapsDraw
            defaultViewState={viewPort}
            defaultDrawingMode={GMAP_FEATURE_TYPES.POINT}
            data={field.value}
            isAutocomplete={true}
            isMultiple={true}
            isImport={true}
            maxZoom={16}
            onDataChange={field.onChange}
            gmapRegion={SITE_CONFIG.MAP.COUNTRY}
            gmapAccessToken={SITE_CONFIG.TOKENS.GMAP}
            mapStyle={{ height: "22rem", width: "100%", borderRadius: ".25rem" }}
            autocompleteComponent={
              <InputGroup mb={4}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Search2Icon color="gray.300" />}
                />
                <Input
                  name="search-gmaps"
                  ref={gmapsSearchRef}
                  placeholder={t("form.find_gmaps")}
                  w="full"
                  required={false}
                />
              </InputGroup>
            }
            importInputComponent={
              <Input
                name="raw-input"
                placeholder={t("form.geometry_hint")}
                required={false}
                mx={4}
              />
            }
            importButtonComponent={
              <Button type="button" placeholder={t("common.add")} children="Import" />
            }
            showTrace={true}
            ref={mapRef}
            traceButtonComponent={
              <NativeLocation
                onViewPortChange={setViewPort}
                onChange={mapRef.current?.replaceFeature}
              />
            }
          />
        </Box>
        <FormErrorMessage
          children={namedFormErrorMessage(fieldState?.error?.message, name, title)}
        />
        {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
      </FormInputControl>
    </FormControl>
  );
};
