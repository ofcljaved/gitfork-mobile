import { fetchUser } from "@/actions/fetchUser";
import { Container } from "@/components/Container";
import { skipToken, useQuery } from "@tanstack/react-query";
import { Dimensions, Text } from "react-native";
import { useEffect, useState } from "react";
import SearchBar from "@/components/search-bar";
import { UserCard } from "@/components/user-card";
import { RepoList } from "@/components/repo-list";
import { Blur, Canvas, Circle, Group, LinearGradient, Paint, Path, Skia, usePathValue, vec } from "@shopify/react-native-skia";
import { Easing, useDerivedValue, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");
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

    const wavePath = Skia.Path.Make();
    const middleHeight = (height / 2.5) + Math.random() * 5;
    const baseAmplitude = 20;
    const frequency = 2 * Math.PI / width;

    const animatedAmplitude = useSharedValue(baseAmplitude);

    // Set up the animation
    useEffect(() => {
        animatedAmplitude.value = withRepeat(
            withSequence(
                withTiming(-2 * baseAmplitude, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
                withTiming(baseAmplitude, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
            ),
            -1,
            false // Reverse the animation
        );
    }, [animatedAmplitude]);

    //const randomAmplitudes = [
    //    Math.random() * baseAmplitude,
    //    Math.random() * (baseAmplitude / 8),
    //];
    //
    //const randomPhaseOffsets = [
    //    Math.random() * Math.PI * 2,
    //    Math.random() * Math.PI * 2,
    //];

    const animatedPath = usePathValue((path) => {
        "worklet";
        path.reset();
        path.moveTo(-10, middleHeight);

        for (let x = -10; x < width + 20; x += 5) {
            const amplitude = animatedAmplitude.value;
            //const y = amplitude * Math.sin(frequency * x) +
            //    amplitude * Math.sin(frequency * 1.5 * x);

            const y = baseAmplitude * Math.sin(frequency * x) +
                (amplitude / 2) * Math.sin((frequency * 1.5) * x) +
                (amplitude / 3) * Math.sin((frequency * 1.5) * x);
            path.lineTo(x, y + middleHeight);
        }
    }, wavePath);
    const colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];
    return (
        <Canvas style={{ flex: 1, backgroundColor: "black" }}>
            <Path
                path={animatedPath}
                style="stroke"
                strokeWidth={25}
                opacity={0.5}
                color="blue"
            >
                <Blur blur={6} />
            </Path>
            <Group>
                {[].map((color, index) => (
                    <Wave
                        key={index}
                        color={color}
                        nextColor={colors[(index + 1) % colors.length]}
                        initialPhase={Math.random() * 5 * Math.PI}
                    />
                ))}
            </Group>
        </Canvas>
    );
}

const Wave = ({
    color,
    nextColor,
    initialPhase = 0,
}: {
    color: string,
    nextColor: string,
    initialPhase?: number,
}) => {
    const wavePath = Skia.Path.Make();
    const middleHeight = (height / 2.5) + Math.random() * 5;
    const baseAmplitude = 50;
    const frequency = 2 * Math.PI / width;

    const randomAmplitudes = [
        Math.random() * baseAmplitude,
        Math.random() * (baseAmplitude / 8),
    ];

    const randomPhaseOffsets = [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
    ];

    const animatedPath = usePathValue((path) => {
        "worklet";
        path.reset();
        path.moveTo(-10, middleHeight);

        for (let x = -10; x < width + 20; x += 5) {
            const y =
                randomAmplitudes[0] * Math.sin(frequency * x + initialPhase + randomPhaseOffsets[0]) +
                randomAmplitudes[1] * Math.sin(frequency * 2 * x + initialPhase + randomPhaseOffsets[1])

            path.lineTo(x, y + middleHeight);
        }
    }, wavePath);
    return (
        <Path
            path={animatedPath}
            style="stroke"
            strokeWidth={25}
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

