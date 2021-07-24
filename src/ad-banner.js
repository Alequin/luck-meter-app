import { AdMobBanner } from "expo-ads-admob";
import React from "react";
import { StyleSheet, View } from "react-native";

export const AdBanner = () => {
  return (
    <View style={styles.container}>
      <AdMobBanner
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={false} // true or false
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "black",
    width: "100%",
    marginTop: 10,
  },
});
