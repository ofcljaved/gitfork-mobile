import { Container } from "@/components/Container";
import { Stack } from "expo-router";
import { Text } from "react-native";

export default function Index() {
    return (
        <>
            <Stack.Screen options={{ title: 'Home' }} />
            <Container>
                <Text className="text-primary">
                    Hello, Dan!
                </Text>
            </Container>
        </>
    );
}
