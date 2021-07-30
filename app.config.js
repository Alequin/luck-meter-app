import { googleMobileAdsAppId } from "./secrets.json";
const version = 2;

export default {
  name: "Luck 'o' Meter",
  slug: "luck-o-meter",
  version: `${version}.0.0`,
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  android: {
    package: "com.just_for_fun.luck_meter",
    permissions: [], // Use minimum permissions (https://docs.expo.dev/versions/latest/config/app/#permissions)
    versionCode: version,
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#000000",
    },
    config: {
      googleMobileAdsAppId,
    },
  },
};
