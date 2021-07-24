import { StatusBar } from "expo-status-bar";
import { isNull } from "lodash";
import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AdBanner } from "./src/ad-banner";
import { CurrentLuckPage as LuckPage } from "./src/current-luck-page/current-luck-page";
import { useLuckScore } from "./src/use-luck-score";

export const App = () => {
  const luckScore = useLuckScore();

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        backgroundColor: "black",
        justifyContent: "space-between",
      }}
    >
      <StatusBar />
      {!isNull(luckScore) && (
        <>
          <LuckPage luckScore={luckScore} />
          <AdBanner />
        </>
      )}
    </View>
  );
};

const AppWithSafeArea = () => (
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
);

export default AppWithSafeArea;
