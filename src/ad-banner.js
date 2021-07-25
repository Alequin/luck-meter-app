import { AdMobBanner } from "expo-ads-admob";
import React from "react";
import { StyleSheet, View } from "react-native";
import { bannerUnitId } from "../secrets.json";

export const AdBanner = () => {
  return (
    <View style={styles.container}>
      <AdMobBanner
        adUnitID={
          isProductionEnv()
            ? bannerUnitId
            : "ca-app-pub-3940256099942544/6300978111" // Test id
        }
        servePersonalizedAds={false} // true or false
      />
    </View>
  );
};

const isProductionEnv = () => process.env.NODE_ENV === "production";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "black",
    width: "100%",
    marginTop: 10,
  },
});
