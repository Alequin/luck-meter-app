import { StatusBar } from "expo-status-bar";
import { isNull } from "lodash";
import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AdBanner } from "./src/ad-banner";
import { CurrentLuckPage as LuckPage } from "./src/current-luck-page/current-luck-page";
import { useLuckScore } from "./src/use-luck-score";

export const App = () => {
  const luckScore = useLuckScore();

  const backgroundOpacity = useRef(new Animated.Value(0)).current;

  const isLuckScoreReadyToBeUsed = !isNull(luckScore);

  useEffect(() => {
    if (isLuckScoreReadyToBeUsed)
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
  }, [isLuckScoreReadyToBeUsed]);

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <Animated.View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "space-between",
          opacity: backgroundOpacity,
        }}
      >
        <StatusBar />
        <LuckPage luckScore={luckScore} />
        <AdBanner />
      </Animated.View>
    </View>
  );
};

const AppWithSafeArea = () => (
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
);

export default AppWithSafeArea;
