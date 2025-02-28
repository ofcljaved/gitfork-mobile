import '@/global.css';

import * as SplashScreen from 'expo-splash-screen';
import { Slot } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import Provider from './_provider';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import WaveBackground from '@/components/ui/wave-background';

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
            <WaveBackground>
                <Slot />
            </WaveBackground>
            <StatusBar style="auto" />
        </Provider>
    )
}
