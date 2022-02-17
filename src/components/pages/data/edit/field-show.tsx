import {
  AspectRatio,
  Box,
  Heading,
  Image,
  ListItem,
  SimpleGrid,
  UnorderedList
} from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import { defaultViewPort } from "@ibp/naksha-commons";
import { NakshaGmapsView } from "@ibp/naksha-gmaps-view";
import { FORM_TYPE } from "@static/constants";
import { formatDate, formatDateRange, formatYear } from "@utils/date";
import { optionLabelShow } from "@utils/field";
import { getInjectableHTML } from "@utils/text";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";

const RenderText = ({ value }) => (
  <Box dangerouslySetInnerHTML={{ __html: getInjectableHTML(value) }} whiteSpace="pre-line" />
);

const RenderOption = ({ value }) => <div>{optionLabelShow(value?.label)}</div>;

const RenderOptionMulti = ({ value }) => (
  <UnorderedList pl={1}>
    {value?.map((o, index) => (
      <ListItem key={index}>{optionLabelShow(o?.label)}</ListItem>
    ))}
  </UnorderedList>
);

const RenderNumber = ({ value }) => <div>{value?.join(" - ")}</div>;

const RenderDate = ({ value }) => <div>{value ? formatDate(value) : null}</div>;

const RenderYear = ({ value }) => <div>{value ? formatYear(value) : null}</div>;

const RenderDateRange = ({ value }) => (
  <div>{value ? formatDateRange(value).join(" - ") : null}</div>
);

const RenderFile = ({ value }) => {
  const { t } = useTranslation();

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4} mt={2}>
      {value?.map((resource) => (
        <Box
          bg="white"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          overflow="hidden"
          key={resource?.path}
        >
          <a href={resource?.path} target="_blank" rel="noreferrer">
            <AspectRatio ratio={1}>
              <Image alt={resource?.attribution} src={resource?.path} />
            </AspectRatio>
          </a>
          <Box fontSize="sm" fontWeight="normal" p={2}>
            {t("form.attribution")}: {resource?.attribution || "NA"}
            <br />
            {t("form.license")}: {resource?.license}
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};

const RenderGeometry = ({ value }) => (
  <Box pt={2}>
    <ErrorBoundary fallback={<div>GeoJson Invalid/Unavailable!</div>}>
      <NakshaGmapsView
        defaultViewPort={defaultViewPort}
        features={value}
        gmapRegion={SITE_CONFIG.MAP.COUNTRY}
        gmapApiAccessToken={SITE_CONFIG.TOKENS.GMAP}
        maxZoom={14}
        mapStyle={{
          height: "30rem",
          width: "100%",
          borderRadius: ".25rem",
          overflow: "hidden"
        }}
      />
    </ErrorBoundary>
  </Box>
);

export default function FieldShow({ field, response }) {
  const value = response?.ccaFieldValues?.[field.fieldId]?.value;

  switch (field.type) {
    case FORM_TYPE.HEADING:
      return (
        <Heading id={field.fieldId} css={{ scrollMarginTop: "var(--content-top)" }} size="lg">
          {field.name}
        </Heading>
      );

    case FORM_TYPE.RICHTEXT:
    case FORM_TYPE.TEXT:
    case FORM_TYPE.TEXT_AREA:
      return <RenderText value={value} />;

    case FORM_TYPE.SINGLE_SELECT:
    case FORM_TYPE.RADIO:
      return <RenderOption value={value} />;

    case FORM_TYPE.MULTI_SELECT:
    case FORM_TYPE.CHECKBOX:
      return <RenderOptionMulti value={value} />;

    case FORM_TYPE.NUMBER_RANGE:
      return <RenderNumber value={value} />;

    case FORM_TYPE.DATE:
      return <RenderDate value={value} />;

    case FORM_TYPE.YEAR:
      return <RenderYear value={value} />;

    case FORM_TYPE.DATE_RANGE:
      return <RenderDateRange value={value} />;

    case FORM_TYPE.FILE:
      return <RenderFile value={value} />;

    case FORM_TYPE.GEOMETRY:
      return <RenderGeometry value={value} />;

    default:
      return <div>{JSON.stringify(value)}</div>;
  }
}
