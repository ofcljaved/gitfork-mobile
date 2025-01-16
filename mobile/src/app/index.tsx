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

    const createWavePath = () => {
        const path = Skia.Path.Make();
        const middleHeight = height / 2;
        const amplitude = 30;
        const frequency = 2 * Math.PI / width;
        const phase = Math.random() * 5 * Math.PI;

        path.moveTo(-10, middleHeight);

        for (let x = -10; x < width + 20; x += 5) {
            const y = amplitude * Math.sin(frequency * x + phase);
            path.lineTo(x, y + middleHeight);
        }
        return path;
    };

    const colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];
    return (
        <Canvas style={{ flex: 1, backgroundColor: "black" }}>
            <Paint color="black" style="fill" />

            {colors.map((color, index) => (
                <Path
                    key={index}
                    path={createWavePath()}
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
