import { fetchUser } from "@/actions/fetchUser";
import { Container } from "@/components/Container";
import { skipToken, useQuery } from "@tanstack/react-query";
import { Dimensions, Text } from "react-native";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/search-bar";
import { UserCard } from "@/components/user-card";
import { RepoList } from "@/components/repo-list";
import { Blur, Canvas, Circle, Group, LinearGradient, Paint, Path, Skia, usePathValue, vec } from "@shopify/react-native-skia";
import { Easing, EasingFunction, EasingFunctionFactory, interpolate, useDerivedValue, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");


const getRandomValue = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

export default function Home() {
    const [search, setSearch] = useState<string>("");
    const { data, isLoading } = useQuery({
        queryKey: ["user", search],
        queryFn: !!search ? () => fetchUser(search) : skipToken,
    });
    function handleSubmit(value: string) {
        setSearch(value.trim());
    }

    //return (
    //    <Container>
    //        <SearchBar onSubmit={handleSubmit} />
    //        {isLoading && <Text>Loading...</Text>}
    //        {data && <UserCard user={data} />}
    //        {data && <RepoList original={data.notForkedRepos} forked={data.forkedRepos} />}
    //    </Container >
    //);

    const colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];
    return (
        <Canvas style={{ flex: 1, backgroundColor: "black" }}>
            <Group>
                {colors.map((color, index) => (
                    <Wave
                        key={index}
                        color={color}
                        nextColor={colors[(index + 1) % colors.length]}
                        baseAmplitude={getRandomValue(25, 35)}
                        crestAmplitudeEnd={getRandomValue(80, 100)}
                        troughAmplitudeEnd={getRandomValue(80, 100)}
                        phaseOffset={getRandomValue(0, 6 * Math.PI)}
                        animationDuration={getRandomValue(2000, 6000)}
                    />
                ))}
            </Group>
        </Canvas>
    );
}

const Wave = ({
    color,
    nextColor,
    crestAmplitudeEnd,
    troughAmplitudeEnd,
    phaseOffset,
    animationDuration,
    baseAmplitude = 25,
}: {
    color: string,
    nextColor: string,
    crestAmplitudeEnd: number,
    troughAmplitudeEnd: number,
    phaseOffset: number,
    animationDuration: number,
    baseAmplitude?: number,
}) => {
    const wavePath = Skia.Path.Make();
    const middleHeight = useMemo(() => (height / 2.5) + Math.random() * 15, [height]);
    const frequency = useMemo(() => 2 * Math.PI / width, [width]);

    const crestAmplitude = useSharedValue(0);
    const troughAmplitude = useSharedValue(0);
    const animatedPhase = useSharedValue(phaseOffset);

    const setupAnimations = (value: number, duration: number, easing: EasingFunction | EasingFunctionFactory) => {
        return withRepeat(
            withTiming(value, { duration, easing }),
            -1,
            true
        );
    };

    useEffect(() => {
        crestAmplitude.value = setupAnimations(crestAmplitudeEnd, animationDuration, Easing.bezier(0.42, 0, 0.58, 1));
        troughAmplitude.value = setupAnimations(troughAmplitudeEnd, animationDuration * 1.5, Easing.bezier(0.25, 0.1, 0.25, 1));
        animatedPhase.value = withRepeat(
            withTiming(phaseOffset - (2 * Math.PI), { duration: animationDuration * 2, easing: Easing.linear }),
            -1,
            false
        );
    }, [crestAmplitude, troughAmplitude, animatedPhase]);

    const calculateY = (x: number) => {
        "worklet";
        const crest = interpolate(crestAmplitude.value, [0, crestAmplitudeEnd], [-2 * baseAmplitude, baseAmplitude, 2 * baseAmplitude]);
        const trough = interpolate(troughAmplitude.value, [0, troughAmplitudeEnd], [-2 * baseAmplitude, baseAmplitude, 2 * baseAmplitude]);
        const globalPhase = animatedPhase.value;

        return crest * Math.sin(frequency * x + globalPhase) +
            (trough / 2) * Math.sin((frequency * 1.5) * x + Math.PI / 2 + globalPhase) +
            (crest / 3) * Math.sin((frequency * 1.5) * x + Math.PI + globalPhase);
    };
    const animatedPath = usePathValue((path) => {
        "worklet";
        path.reset();
        path.moveTo(-10, middleHeight);

        for (let x = -10; x < width + 20; x += 10) {
            const y = calculateY(x);
            path.lineTo(x, y + middleHeight);
        }
    }, wavePath);
    return (
        <Path
            path={animatedPath}
            style="stroke"
            strokeWidth={30}
            opacity={0.5}
        >
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: width, y: 0 }}
                colors={[color, nextColor]}
            />
            <Blur blur={6} />
        </Path>
    );
}

