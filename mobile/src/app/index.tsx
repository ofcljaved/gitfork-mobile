import { fetchUser } from "@/actions/fetchUser";
import { Container } from "@/components/Container";
import { skipToken, useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import SearchBar from "@/components/search-bar";
import { UserCard, UserCardSkeleton } from "@/components/user-card";
import { RepoList } from "@/components/repo-list";
import { Text } from "react-native";

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
            <SearchBar onSubmit={handleSubmit} />
            {isLoading && <UserCardSkeleton />}
            {data && <UserCard user={data} />}
        </Container >
    );

}
//{data && <RepoList original={data.notForkedRepos} forked={data.forkedRepos} />}

