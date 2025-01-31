import { fetchUser } from "@/actions/fetchUser";
import { Container } from "@/components/Container";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SearchBar from "@/components/search-bar";
import { UserCard } from "@/components/user-card";
import { RepoList } from "@/components/repo-list";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

export default function Home() {
    const [search, setSearch] = useState<string>("");
    const { data, isLoading } = useQuery({
        queryKey: ["user", search],
        queryFn: !!search ? () => fetchUser(search) : skipToken,
    });
    function handleSubmit(value: string) {
        setSearch(value.trim());
    }
    const offset = useSharedValue<number>(0);

    const animatedStyles = useAnimatedStyle(() => ({
        width: interpolate(offset.value, [0, 1], [25, 55]),
        height: interpolate(offset.value, [0, 1], [25, 5]),
        opacity: interpolate(offset.value, [0, 1], [0.5, 1]),
    }));


    useEffect(() => {
        offset.value = withRepeat(withTiming(1, { duration: 1750 }), -1, true);
    }, [])

    return (
        <Container className="flex-1">
            <Input
                variant="outline"
                size="xl"
                className="rounded-lg relative overflow-auto"
            >
                <InputSlot className="w-6 h-6 ml-2">
                    <Icon className="text-primary-100" name="search" />
                </InputSlot>
                <InputField placeholder="Enter Text here..." />
                <Animated.View
                    style={[animatedStyles]}
                    className="absolute w-20 -z-10 rounded-lg rounded-r-[0px] rounded-bl-[0px] border-t border-l -left-[0.5px] -top-[0.5px] border-[#8c98f5]"
                />
            </Input>
        </Container >
    );

}

//<SearchBar onSubmit={handleSubmit} />
//{isLoading && <Text>Loading...</Text>}
//{data && <UserCard user={data} />}
//{data && <RepoList original={data.notForkedRepos} forked={data.forkedRepos} />}
