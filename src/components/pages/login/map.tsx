import { Box } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import { NakshaGmapsDraw } from "@ibp/naksha-gmaps-draw";
import { getMapCenter } from "@utils/location";
import React from "react";

const defaultViewPort = getMapCenter(2.8);

/**
 * This component is to cache/prepare map component for offline use
 *
 * @export
 * @return {*}
 */
export default function DummyMap() {
  return (
    <Box hidden={true}>
      <NakshaGmapsDraw
        defaultViewPort={defaultViewPort}
        isAutocomplete={true}
        isMultiple={true}
        isImport={true}
        gmapRegion={SITE_CONFIG.MAP.COUNTRY}
        gmapApiAccessToken={SITE_CONFIG.TOKENS.GMAP}
      />
    </Box>
  );
}
