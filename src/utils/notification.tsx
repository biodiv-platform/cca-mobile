import { createStandaloneToast } from "@chakra-ui/toast";
import { customTheme } from "@configs/theme";

export enum NotificationType {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}

const notification = (message, type = NotificationType.Error) => {
  if (!message) {
    return;
  }
  const toast = createStandaloneToast({ theme: customTheme });

  toast({
    description: message,
    isClosable: true,
    position: "bottom",
    status: type as any,
    variant: "subtle"
  });
};

export default notification;
