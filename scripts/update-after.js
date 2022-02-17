/* eslint-disable @typescript-eslint/no-var-requires */
import { readFileSync, writeFileSync } from "fs";
import path from "path";

import SITE_CONFIG from "../src/configs/site-config.js";
import CAP_CONFIG from "../capacitor.config.json";

function updateCapacitorConfig() {
  if (!SITE_CONFIG.TOKENS.OAUTH_GOOGLE) return;

  if (CAP_CONFIG.plugins.GoogleAuth.serverClientId !== SITE_CONFIG.TOKENS.OAUTH_GOOGLE) {
    let cap_config_content = { ...CAP_CONFIG };
    cap_config_content.plugins.GoogleAuth.serverClientId = SITE_CONFIG.TOKENS.OAUTH_GOOGLE;

    writeFileSync(
      path.join(__dirname, "../capacitor.config.json"),
      JSON.stringify(cap_config_content)
    );
  }
}

/**
 * updates `strings.xml` file and adds Google OAuth Web Client ID
 *
 */
function updateStringsXML() {
  const string_xml_path = path.join(__dirname, "../android/app/src/main/res/values/strings.xml");

  try {
    if (!SITE_CONFIG.TOKENS.OAUTH_GOOGLE) return;

    const strings_xml_content = readFileSync(string_xml_path, "utf8");
    if (!strings_xml_content.includes("server_client_id")) {
      writeFileSync(
        string_xml_path,
        strings_xml_content.replace(
          "</resources>",
          `<string name="server_client_id">${SITE_CONFIG.TOKENS.OAUTH_GOOGLE}</string></resources>`
        )
      );
    }
  } catch (err) {
    console.error(err);
  }
}

function updateAndroidManifest() {
  const manifest_path = path.join(__dirname, `../android/app/src/main/AndroidManifest.xml`);

  const permissions = `
      <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
      <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
      <uses-feature android:name="android.hardware.location.gps" />
    </manifest>
  `;

  try {
    const manifest_content = readFileSync(manifest_path, "utf8");
    if (!manifest_content.includes("ACCESS_COARSE_LOCATION")) {
      writeFileSync(manifest_path, manifest_content.replace("</manifest>", permissions));
    }
  } catch (e) {
    console.error(e);
  }
}

updateStringsXML();
updateCapacitorConfig();
updateAndroidManifest();
