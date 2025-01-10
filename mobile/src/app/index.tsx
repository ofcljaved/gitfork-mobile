import { fetchUser } from "@/actions/fetchUser";
import { Container } from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native";
import { useEffect } from "react";

export default function Home() {
    const { data, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
    });
    console.log(data);
    return (
        <Container>
            <Text className="text-primary">
                Hello, Dan!
            </Text>
        </Container>
    );
}
