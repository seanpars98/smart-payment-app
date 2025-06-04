import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import Colors from "@/constants/colors";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "600",
        },
        headerBackTitle: "Back",
        animation: Platform.OS === "android" ? "fade_from_bottom" : "default",
        headerShadowVisible: true,
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="send" 
        options={{ 
          title: "Send Money",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="request" 
        options={{ 
          title: "Request Money",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="deposit" 
        options={{ 
          title: "Deposit Funds",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="withdraw" 
        options={{ 
          title: "Withdraw Funds",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="transaction/[id]" 
        options={{ 
          title: "Transaction Details",
        }} 
      />
      <Stack.Screen 
        name="profile/[id]" 
        options={{ 
          title: "User Profile",
        }} 
      />
    </Stack>
  );
}