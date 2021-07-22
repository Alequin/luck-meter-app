import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CurrentLuckPage } from "./src/current-luck-page/current-luck-page";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={CurrentLuckPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
