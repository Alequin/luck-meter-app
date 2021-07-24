import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CurrentLuckPage as LuckPage } from "./src/current-luck-page/current-luck-page";

export const App = () => {
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "black" }}>
      <StatusBar />
      <LuckPage />
    </View>
  );
};

const AppWithSafeArea = () => (
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
);

export default AppWithSafeArea;
