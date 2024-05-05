import { useCallback } from "react";

import ThemeConfig from "@/constants/myTheme";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export const useCustomFont = () => {
  const theme = ThemeConfig();
  const [fontsLoaded, fontError] = useFonts({
    [theme.aeonisMedium]: require("@@/assets/fonts/AeonisMedium.ttf"),
    [theme.aeonisBold]: require("@@/assets/fonts/AeonisBold.ttf"),
    [theme.aeonisBoldExtended]: require("@@/assets/fonts/AeonisBoldExtended.ttf"),
    [theme.aeonisExtended]: require("@@/assets/fonts/AeonisExtended.ttf"),
    [theme.montserrat]: require("@@/assets/fonts/Montserrat.otf"),
  });

  console.log(fontsLoaded, fontError);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return { fontsLoaded, fontError, onLayoutRootView };
};
