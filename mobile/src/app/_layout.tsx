import '@/global.css';

import * as SplashScreen from 'expo-splash-screen';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import Provider from './_provider';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }
    return (
        <Provider>
            <Stack>
                <Stack.Screen name='index' options={{ title: 'Home' }} />
            </Stack>
            <StatusBar style="auto" />
        </Provider>
    )
}
