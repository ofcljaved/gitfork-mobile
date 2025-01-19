import { fetchUser } from "@/actions/fetchUser";
import { Container } from "@/components/Container";
import { skipToken, useQuery } from "@tanstack/react-query";
import { Dimensions, Text } from "react-native";
import { useEffect, useState } from "react";
import SearchBar from "@/components/search-bar";
import { UserCard } from "@/components/user-card";
import { RepoList } from "@/components/repo-list";
import { Blur, Canvas, Circle, Group, LinearGradient, Paint, Path, Skia, usePathValue, vec } from "@shopify/react-native-skia";
import { Easing, useDerivedValue, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
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

    const colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];
    return (
        <Canvas style={{ flex: 1, backgroundColor: "black" }}>
            <Group>
                {colors.map((color, index) => (
                    <Wave
                        key={index}
                        color={color}
                        nextColor={colors[(index + 1) % colors.length]}
                        intialPhase={Math.random() * 5 * Math.PI}
                        index={index}
                    />
                ))}
            </Group>
        </Canvas>
    );
}

const Wave = ({
    color,
    nextColor,
    intialPhase = 0,
    index,
}: {
    color: string,
    nextColor: string,
    intialPhase?: number,
    index: number,
}) => {
    const phase = useSharedValue(intialPhase);
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
                randomAmplitudes[0] * Math.sin(frequency * x + phase.value + randomPhaseOffsets[0]) +
                randomAmplitudes[1] * Math.sin(frequency * 2 * x + phase.value + randomPhaseOffsets[1])

            path.lineTo(x, y + middleHeight);
        }
    }, wavePath);
    useEffect(() => {
        phase.value = withRepeat(
            withTiming(phase.value + (-2 * Math.PI), {
                duration: 6000 + (Math.random() * 10000),
                easing: Easing.linear,
            }),
            -1,
            false
        );
    }, []);
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
