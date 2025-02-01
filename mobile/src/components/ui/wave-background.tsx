import { Dimensions, Text, View, ViewProps } from "react-native";
import { useEffect, useMemo } from "react";
import { Blur, Canvas, Group, LinearGradient, Path, Skia, usePathValue } from "@shopify/react-native-skia";
import { Easing, EasingFunction, EasingFunctionFactory, interpolate, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { getRandomValue } from "@/lib/getRandomValue";
import { useColorScheme } from "nativewind";

const { width, height } = Dimensions.get("window");
const WAVE_COLORS = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];
const WAVE_CONFIG = {
    STROKE_WIDTH: 30,
    OPACITY: 0.6,
    BLUR_AMOUNT: 5,
    PATH: {
        START_OFFSET: -10,
        END_OFFSET: 20,
        STEP: 10,
    },
    MIDDLE_HEIGHT: {
        DIVISOR: 2,
        RANDOM_OFFSET: 15,
    },
    FREQUENCY_MULTIPLIER: 1.75,
    FREQUENCY_VARIANCE: 1.5,
    ANIMATION: {
        TROUGH_DURATION_MULTIPLIER: 1.5,
        EASING_CREST: Easing.bezier(0.42, 0, 0.58, 1),
        EASING_TROUGH: Easing.bezier(0.25, 0.1, 0.25, 1),
    },
    BASE_AMPLITUDE_RANGE: [20, 25] as [number, number],
    CREST_AMPLITUDE_RANGE: [80, 90] as [number, number],
    TROUGH_AMPLITUDE_RANGE: [80, 100] as [number, number],
    PHASE_OFFSET_RANGE: [0, 5 * Math.PI] as [number, number],
    ANIMATION_DURATION_RANGE: [2000, 6000] as [number, number],
};

interface WaveBackgroundProps extends ViewProps {
}

export default function WaveBackground({ children }: WaveBackgroundProps) {
    const { colorScheme } = useColorScheme();

    return (
        <View className="relative flex-1">
            <Canvas style={{
                backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
                position: "absolute",
                height: "100%",
                width: "100%",
            }}>
                <Group>
                    {WAVE_COLORS.map((color, index) => {
                        const nextColorIndex = (index + 1) % WAVE_COLORS.length;
                        return (
                            <Wave
                                key={`${color}-${index}`}
                                color={color}
                                nextColor={WAVE_COLORS[nextColorIndex]}
                                baseAmplitude={getRandomValue(...WAVE_CONFIG.BASE_AMPLITUDE_RANGE)}
                                crestAmplitudeEnd={getRandomValue(...WAVE_CONFIG.CREST_AMPLITUDE_RANGE)}
                                troughAmplitudeEnd={getRandomValue(...WAVE_CONFIG.TROUGH_AMPLITUDE_RANGE)}
                                phaseOffset={getRandomValue(...WAVE_CONFIG.PHASE_OFFSET_RANGE)}
                                animationDuration={getRandomValue(...WAVE_CONFIG.ANIMATION_DURATION_RANGE)}
                            />
                        )
                    })}
                </Group>
            </Canvas>
            <View className="h-full flex-1 dark:bg-black/75 bg-white/75"/>
            <View className="absolute h-full w-full z-1">
                {children}
            </View>
        </View>
    );
}

interface WaveProps {
    color: string;
    nextColor: string;
    crestAmplitudeEnd: number;
    troughAmplitudeEnd: number;
    phaseOffset: number;
    animationDuration: number;
    baseAmplitude?: number;
}

const Wave = ({
    color,
    nextColor,
    crestAmplitudeEnd,
    troughAmplitudeEnd,
    phaseOffset,
    animationDuration,
    baseAmplitude = 25,
}: WaveProps) => {
    const wavePath = Skia.Path.Make();
    const crestAmplitude = useSharedValue(0);
    const troughAmplitude = useSharedValue(0);

    const middleHeight = useMemo(
        () => (height / WAVE_CONFIG.MIDDLE_HEIGHT.DIVISOR) +
            Math.random() * WAVE_CONFIG.MIDDLE_HEIGHT.RANDOM_OFFSET,
        [height]
    );

    const frequency = useMemo(
        () => WAVE_CONFIG.FREQUENCY_MULTIPLIER * Math.PI / width,
        [width]
    );


    const setupAnimations = (value: number, duration: number, easing: EasingFunction | EasingFunctionFactory) => {
        return withRepeat(
            withTiming(value, { duration, easing }),
            -1,
            true
        );
    };

    useEffect(() => {
        crestAmplitude.value = setupAnimations(
            crestAmplitudeEnd,
            animationDuration,
            WAVE_CONFIG.ANIMATION.EASING_CREST
        );
        troughAmplitude.value = setupAnimations(
            troughAmplitudeEnd,
            animationDuration * WAVE_CONFIG.ANIMATION.TROUGH_DURATION_MULTIPLIER,
            WAVE_CONFIG.ANIMATION.EASING_TROUGH
        );
    }, []);

    const calculateY = (x: number) => {
        "worklet";
        const crest = interpolate(crestAmplitude.value, [0, crestAmplitudeEnd], [-2 * baseAmplitude, baseAmplitude, 2 * baseAmplitude]);
        const trough = interpolate(troughAmplitude.value, [0, troughAmplitudeEnd], [-2 * baseAmplitude, baseAmplitude, 2 * baseAmplitude]);

        const freqVariance = frequency * WAVE_CONFIG.FREQUENCY_VARIANCE;
        return crest * Math.sin(frequency * x + phaseOffset) +
            (trough / 2) * Math.sin(freqVariance * x + Math.PI / 2 + phaseOffset) +
            (crest / 3) * Math.sin(freqVariance * x + Math.PI + phaseOffset);
    };

    const animatedPath = usePathValue((path) => {
        "worklet";
        path.reset();
        path.moveTo(WAVE_CONFIG.PATH.START_OFFSET, middleHeight);

        for (
            let x = WAVE_CONFIG.PATH.START_OFFSET;
            x < width + WAVE_CONFIG.PATH.END_OFFSET;
            x += WAVE_CONFIG.PATH.STEP
        ) {
            const y = calculateY(x);
            path.lineTo(x, y + middleHeight);
        }
    }, wavePath);

    return (
        <Path
            path={animatedPath}
            style="stroke"
            strokeWidth={WAVE_CONFIG.STROKE_WIDTH}
            opacity={WAVE_CONFIG.OPACITY}
        >
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: width, y: 0 }}
                colors={[color, nextColor]}
            />
            <Blur blur={WAVE_CONFIG.BLUR_AMOUNT} />
        </Path>
    );
}

