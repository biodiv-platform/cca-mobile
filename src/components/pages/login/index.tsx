import "./login.css";
import "@codetrix-studio/capacitor-google-auth";

import { Browser } from "@capacitor/browser";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { PhoneNumberInputField } from "@components/form/phone-number";
import { RadioInputField } from "@components/form/radio";
import { TextBoxField } from "@components/form/text";
import SITE_CONFIG from "@configs/site-config";
import { yupResolver } from "@hookform/resolvers/yup";
import useGlobalState from "@hooks/use-global-state";
import { axLogin } from "@services/auth.service";
import { STORAGE_KEYS, VERIFICATION_MODE, VERIFICATION_TYPE } from "@static/constants";
import notification, { NotificationType } from "@utils/notification";
import { Storage } from "@utils/storage";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { useHistory } from "react-router";
import * as Yup from "yup";

import LanguageChooser from "../settings/language-chooser";
import DummyMap from "./map";

export function LoginPageComponent() {
  const { t } = useTranslation();
  const [showMobile, setShowMobile] = useState(true);
  const { initializeStorage, setIsLoading, user, isLoggedIn } = useGlobalState();

  const history = useHistory();

  useEffect(() => {
    if (user.init && isLoggedIn) {
      history.replace("/home");
    }
  }, [user]);

  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(
      Yup.object().shape({
        verificationType: Yup.string().required(),
        email: Yup.string()
          .email()
          .when("verificationType", {
            is: (m) => m === VERIFICATION_TYPE[0].value,
            then: Yup.string().required()
          }),
        mobileNumber: Yup.string()
          .test("mobile", "invalid mobile", (v) => (v ? isPossiblePhoneNumber(v) : true))
          .when("verificationType", {
            is: (m) => m === VERIFICATION_TYPE[1].value,
            then: Yup.string().required()
          }),
        password: Yup.string().required()
      })
    ),
    defaultValues: {
      verificationType: VERIFICATION_TYPE[0].value
    }
  });

  const verificationType = hForm.watch("verificationType");

  useEffect(() => {
    setShowMobile(verificationType === VERIFICATION_TYPE[1].value);
  }, [verificationType]);

  const handleOnSubmit = async (v) => {
    setIsLoading(true);
    const payload = {
      username: showMobile ? v.mobileNumber : v.email,
      password: v.password,
      mode: v.mode || VERIFICATION_MODE.MANUAL
    };

    const { success, data } = await axLogin(payload);

    setIsLoading(false);

    if (success && data?.status) {
      if (data?.verificationRequired) {
        notification("Account verification required");
      } else {
        notification("Welcome!", NotificationType.Success);
        Storage.set(STORAGE_KEYS.BATOKEN, data.access_token);
        Storage.set(STORAGE_KEYS.BRTOKEN, data.refresh_token);
        initializeStorage();
      }
    } else {
      notification("Invalid Credentials", NotificationType.Error);
    }
  };

  const handleOnRegister = () => {
    Browser.open({ url: `${SITE_CONFIG.SITE.SITE_URL}/register` });
  };

  const handleGoogleSignIn = async () => {
    try {
      const r: any = await GoogleAuth.signIn();
      handleOnSubmit({ email: r.email, password: r.idToken, mode: VERIFICATION_MODE.OAUTH_GOOGLE });
    } catch (e) {
      notification("Unable to Sign In using Google");
    }
  };

  return (
    <div>
      <div className="login-logo">
        <img src="/assets/icon/logo.png" className="logo" alt="Logo" />
      </div>
      <Box p={4}>
        <LanguageChooser />
        <FormProvider {...hForm}>
          <form onSubmit={hForm.handleSubmit(handleOnSubmit)} className="pure-form">
            <div data-hidden={!SITE_CONFIG.REGISTER.MOBILE}>
              <RadioInputField name="verificationType" options={VERIFICATION_TYPE} />
            </div>
            {showMobile ? (
              <PhoneNumberInputField name="mobileNumber" label={t("form.mobile")} />
            ) : (
              <TextBoxField name="email" type="email" label={t("form.email")} />
            )}
            <TextBoxField name="password" type="password" label={t("form.password")} />
            <SimpleGrid columns={2} spacing={4} mb={4}>
              <Button type="submit" colorScheme="blue" w="full">
                {t("auth.login")}
              </Button>
              <Button onClick={handleOnRegister} color="light" w="full">
                {t("auth.signup")}
              </Button>
            </SimpleGrid>
            <Button w="full" colorScheme="messenger" onClick={handleGoogleSignIn}>
              {t("auth.sign_in_google")}
            </Button>
          </form>
          <DummyMap />
        </FormProvider>
      </Box>
    </div>
  );
}
