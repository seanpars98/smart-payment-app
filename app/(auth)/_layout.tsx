import { Stack } from "expo-router";
import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    if (isAuthenticated) {
      // If they're signed in and on the auth screens, redirect away
      if (segments[0] === "(auth)") {
        router.replace("/(tabs)");
      }
    } else {
      // If they're not signed in and not on the auth screens, redirect to login
      if (segments[0] !== "(auth)") {
        router.replace("/(auth)/login");
      }
    }
  }, [isAuthenticated, segments]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}