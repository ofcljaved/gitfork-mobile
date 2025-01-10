import { fetchUser } from "@/actions/fetchUser";
import { Container } from "@/components/Container";
import { skipToken, useQuery } from "@tanstack/react-query";
import { Text } from "react-native";
import { useState } from "react";
import SearchBar from "@/components/search-bar";

export default function Home() {
    const [search, setSearch] = useState<string>("");
    const { data, isLoading } = useQuery({
        queryKey: ["user", search],
        queryFn: !!search ? () => fetchUser(search) : skipToken,
    });
    console.log(data);
    function handleSubmit(value: string) {
        setSearch(value.trim());
    }

    return (
        <Container>
            <SearchBar onSubmit={handleSubmit} />
            {isLoading && <Text>Loading...</Text>}
            {!isLoading && (
                <Text>
                    Hello, Dan!
                </Text>
            )}
        </Container >
    );
}
