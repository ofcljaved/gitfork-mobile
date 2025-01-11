import { Repo } from "@/types";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { timesAgo, cn } from "@repo/utils";
import { NO_DESCRIPTION } from "@/constants";
import { useState } from "react";

export const RepoList = ({
    original,
    forked,
}: {
    original: Repo[],
    forked: Repo[],
}) => {
    const [tabs, setTabs] = useState("original");
    return (
        <View className="flex-1" >
            <View className="flex-row">
                <TouchableOpacity
                    className={cn("flex-1 p-3 rounded-full rounded-r-none", tabs === "original" ? "bg-blue-500" : "bg-blue-200")}
                    onPress={() => setTabs("original")}
                >
                    <Text className={cn("text-center", tabs === "original" ? "text-white" : "text-black")}>Original</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={cn("flex-1 p-3 rounded-full rounded-l-none", tabs === "forked" ? "bg-blue-500" : "bg-blue-200")}
                    onPress={() => setTabs("forked")}
                >
                    <Text className={cn("text-center", tabs === "forked" ? "text-white" : "text-black")}>Forked</Text>
                </TouchableOpacity>
            </View>
            {tabs === "original" &&
                <FlatList
                    data={original}
                    renderItem={({ item }) => <RepoCard repo={item} />}
                    keyExtractor={(item) => item.html_url}
                />
            }
            {tabs === "forked" &&
                <FlatList
                    data={forked}
                    renderItem={({ item }) => <RepoCard repo={item} />}
                    keyExtractor={(item) => item.html_url}
                />
            }
        </View>
    );
};

const RepoCard = ({ repo }: { repo: Repo }) => {
    return (
        <View className="my-1 p-4 border-hairline">
            <Text className="text-xl font-medium">{repo.name}</Text>
            <Text className="text-gray-500">{repo.description ?? NO_DESCRIPTION}</Text>
            <View className="flex-row mt-2 gap-2">
                <View className="flex-row items-center gap-1">
                    <Feather name="star" size={16} color="rgb(234 179 8)" />
                    <Text className="font-medium">{repo.stargazers_count}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                    <Octicons name="repo-forked" size={16} color="rgb(96 165 250)" />
                    <Text className="font-medium">{repo.forks_count}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                    <Feather name="globe" size={16} color="rgb(16 185 129)" />
                    <Text className="font-medium">{repo.language}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                    <EvilIcons name="clock" size={16} color="rgb(96 165 250)" />
                    <Text className="font-medium">{timesAgo(new Date(repo.updated_at))}</Text>
                </View>
            </View>
        </View>
    );
};
