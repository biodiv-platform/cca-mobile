import { Box } from "@chakra-ui/react";
import useParticipations from "@hooks/use-participations";
import { IonLoading } from "@ionic/react";
import React, { useState } from "react";

import LanguageChooser from "./language-chooser";

export default function SettingsPageComponent() {
  const { pullData, pullTemplates } = useParticipations();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnLanguageChange = async () => {
    setIsLoading(true);
    await pullData();
    await pullTemplates();
    setIsLoading(false);
  };

  return (
    <Box p={4}>
      <LanguageChooser onChange={handleOnLanguageChange} />
      <IonLoading isOpen={isLoading} />
    </Box>
  );
}
