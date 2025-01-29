import { fetchUser } from "@/actions/fetchUser";
import { Container } from "@/components/Container";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchBar from "@/components/search-bar";
import { UserCard } from "@/components/user-card";
import { RepoList } from "@/components/repo-list";
import WaveBackground from "@/components/ui/wave-background";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

export default function Home() {
    const [search, setSearch] = useState<string>("");
    const { data, isLoading } = useQuery({
        queryKey: ["user", search],
        queryFn: !!search ? () => fetchUser(search) : skipToken,
    });
    function handleSubmit(value: string) {
        setSearch(value.trim());
    }

    return (
        <Container className="flex-1">
            <Text className="text-center text-2xl font-bold">
                GitFork
            </Text>
            <Input
                variant="outline"
                size="xl"
                className="rounded-lg"
            >
                <InputSlot>
                    <AntDesign name="search1" size={20} color="white" />
                </InputSlot>
                <InputField placeholder="Enter Text here..." />
            </Input>
        </Container >
    );

}

//<SearchBar onSubmit={handleSubmit} />
//{isLoading && <Text>Loading...</Text>}
//{data && <UserCard user={data} />}
//{data && <RepoList original={data.notForkedRepos} forked={data.forkedRepos} />}
