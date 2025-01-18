import { fetchUser } from "@/actions/fetchUser";
import { Container } from "@/components/Container";
import { skipToken, useQuery } from "@tanstack/react-query";
import { Dimensions, Text } from "react-native";
import { useEffect, useState } from "react";
import SearchBar from "@/components/search-bar";
import { UserCard } from "@/components/user-card";
import { RepoList } from "@/components/repo-list";
import { Canvas, Circle, Group, LinearGradient, Paint, Path, Skia, usePathValue, vec } from "@shopify/react-native-skia";
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

    //const createWavePath = (amplitude: number, frequency: number) => {
    //    const path = Skia.Path.Make();
    //    path.moveTo(-10, height / 2);
    //    for (let x = -10; x < width +20; x += 5) {
    //        const y = amplitude * Math.sin((2 * Math.PI * frequency * x) / width);
    //        path.lineTo(x, y + height / 2);
    //    }
    //    return path;
    //};

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
}: {
    color: string,
    nextColor: string,
    intialPhase?: number,
}) => {
    const phase = useSharedValue(intialPhase);
    const wavePath = Skia.Path.Make();
    const middleHeight = height / 2;
    const amplitude = 30;
    const frequency = 2 * Math.PI / width;

    const animatedPath = usePathValue((path) => {
        "worklet";
        path.reset();
        path.moveTo(-10, middleHeight);

        for (let x = -10; x < width + 20; x += 5) {
            const y = amplitude * Math.sin(frequency * x + phase.value);
            path.lineTo(x, y + middleHeight);
        }
    }, wavePath);

    useEffect(() => {
        phase.value = withRepeat(
            withTiming(Math.random() * 2 * Math.PI, {
                duration: 8000,
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
            strokeWidth={15}
            opacity={0.5}
        >
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: width, y: 0 }}
                colors={[color, nextColor]}
            />
        </Path>
    );
}
