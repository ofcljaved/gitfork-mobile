import { fetchUser } from "@/actions/fetchUser";
import { Container } from "@/components/Container";
import { skipToken, useQuery } from "@tanstack/react-query";
import { Text } from "react-native";
import { useState } from "react";
import SearchBar from "@/components/search-bar";
import { UserCard } from "@/components/user-card";
import { RepoList } from "@/components/repo-list";

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
        <Container>
            <SearchBar onSubmit={handleSubmit} />
            {isLoading && <Text>Loading...</Text>}
            {data && <UserCard user={data} />}
            {data && <RepoList original={data.notForkedRepos} forked={data.forkedRepos} />}
        </Container >
    );
}
