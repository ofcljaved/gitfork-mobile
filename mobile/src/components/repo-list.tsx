import { Repo } from "@/types";
import { Text, View } from "react-native";
import { Container } from "./Container";

export const RepoList = ({
    original,
    forked,
}: {
    original: Repo[],
    forked: Repo[],
}) => {
    return (
        <View>
            <Text>Original</Text>
            <Text>Forked</Text>
        </View>
    );
};
