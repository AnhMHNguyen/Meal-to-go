import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import { useFonts as useOswald, Oswald_400Regular } from '@expo-google-fonts/oswald';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/infrastructure/theme';
import { initializeApp, getApps } from 'firebase/app';
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import { Navigation } from './src/infrastructure/navigation';

const firebaseConfig = {
  apiKey: "AIzaSyAX9XD33EyQorZvsLIgmunw1yYuDJ10yk0",
  authDomain: "mealstogo-4ff73.firebaseapp.com",
  projectId: "mealstogo-4ff73",
  storageBucket: "mealstogo-4ff73.appspot.com",
  messagingSenderId: "806163901662",
  appId: "1:806163901662:web:38bd02a44db7a041fd264f"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular
  });
  const [latoLoaded] = useLato({
    Lato_400Regular
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
