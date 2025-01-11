import { fetchUser } from "@/actions/fetchUser";
import { Container } from "@/components/Container";
import { skipToken, useQuery } from "@tanstack/react-query";
import { Dimensions, Text } from "react-native";
import { useState } from "react";
import SearchBar from "@/components/search-bar";
import { UserCard } from "@/components/user-card";
import { RepoList } from "@/components/repo-list";
import { Canvas, Circle, Group, LinearGradient, Paint, Path, Skia, vec } from "@shopify/react-native-skia";
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

    const createWavePath = (
        amplitude: number,
        frequency: number,
        startHeight: number,
        endHeight: number
    ) => {
        const path = Skia.Path.Make();
        const middleHeight = height / 2;

        // Start from the specified start height
        path.moveTo(-10, startHeight);

        // Loop to create the wave
        for (let x = -10; x < width + 20; x += 5) {
            const y =
                amplitude *
                Math.sin(
                    (2 * Math.PI * frequency * x) /
                    width // Adjust frequency for multiple tides
                ) +
                middleHeight; // Base height
            path.lineTo(x, y);
        }

        // Move to the end height for smooth transitions
        path.lineTo(width + 20, endHeight);

        return path;
    };
    const colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];
    return (
        <Canvas style={{ flex: 1, backgroundColor: "black" }}>
            <Paint color="black" style="fill" />

            {colors.map((color, index) => (
                <Path
                    key={index}
                    path={createWavePath(
                        50 - index * 10, // Reduced amplitude
                        1.5 + index * 0.1, // Frequency adjustment for one high, two lows
                        height / 2 - index * 15, // Starting Y-axis height variation
                        height / 2 + index * 15 // Ending Y-axis height variation
                    )}
                    style="stroke"
                    strokeWidth={15}
                    opacity={0.5}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: width, y: 0 }}
                        colors={[color, colors[(index >= colors.length - 1) ? 0 : index + 1]]}
                    />
                </Path>
            ))}
        </Canvas>
    );
}
