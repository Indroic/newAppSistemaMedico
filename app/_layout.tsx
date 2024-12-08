import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import { PortalProvider } from "@tamagui/portal";

import { tamaguiConfig } from "../tamagui.config";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";

import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import AuthProvider  from "./context/AuthContext";

import { AlertNotificationRoot } from "react-native-alert-notification";

const darkUse = "dark";
const lightUse = "light";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === darkUse ? DarkTheme : DefaultTheme}>
        <Theme name={colorScheme === darkUse ? darkUse : lightUse}>
          <PortalProvider shouldAddRootHost>
            <AuthProvider>
              <SafeAreaProvider>
                <AlertNotificationRoot>
                  <StatusBar style="auto"></StatusBar>
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="index"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="register"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="modal"
                      options={{ presentation: "transparentModal" }}
                    />
                  </Stack>
                </AlertNotificationRoot>
              </SafeAreaProvider>
            </AuthProvider>
          </PortalProvider>
        </Theme>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
