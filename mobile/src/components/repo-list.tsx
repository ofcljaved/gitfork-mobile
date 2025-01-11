import { Repo } from "@/types";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { timesAgo } from "@repo/utils";

export const RepoList = ({
    original,
    forked,
}: {
    original: Repo[],
    forked: Repo[],
}) => {
    return (
        <View className="border-hairline flex-1" >
            <View className="flex-row">
                <TouchableOpacity className="flex-1">
                    <Text className="text-center">Original</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1">
                    <Text className="text-center">Forked</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={original}
                renderItem={({ item }) => <RepoCard repo={item} />}
                keyExtractor={(item) => item.html_url}
            />
            <FlatList
                data={forked}
                renderItem={({ item }) => <RepoCard repo={item} />}
                keyExtractor={(item) => item.html_url}
            />
        </View>
    );
};

const RepoCard = ({ repo }: { repo: Repo }) => {
    return (
        <View className="border-hairline">
            <Text>{repo.name}</Text>
            <Text>{repo.description}</Text>
            <View className="flex-row">
                <View className="flex-row">
                    <Feather name="star" size={24} color="black" />
                    <Text>{repo.stargazers_count}</Text>
                </View>
                <View className="flex-row">
                    <Octicons name="repo-forked" size={24} color="black" />
                    <Text>{repo.forks_count}</Text>
                </View>
                <View className="flex-row">
                    <Feather name="globe" size={24} color="black" />
                    <Text>{repo.language}</Text>
                </View>
                <View className="flex-row">
                    <EvilIcons name="clock" size={24} color="black" />
                    <Text>{timesAgo(new Date(repo.updated_at))}</Text>
                </View>
            </View>
        </View>
    );
};
