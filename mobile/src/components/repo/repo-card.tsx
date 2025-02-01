import { Repo } from "@/types";
import { View } from "react-native";
import { timesAgo } from "@repo/utils";
import { NO_DESCRIPTION } from "@/constants";
import { Text } from "../ui/text";
import { Icon } from "../ui/icon";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export const RepoCard = ({ repo }: { repo: Repo }) => {
    return (
        <Animated.View 
            className="p-4 bg-background-0/75 border-hairline border-primary-50/50 rounded-xl gap-2 shadow-soft-1"
            entering={FadeIn}
            exiting={FadeOut}
        >
            <Text size="lg"  className="font-medium">{repo.name}</Text>
            <Text className="text-gray-500">{repo.description ?? NO_DESCRIPTION}</Text>
            <View className="flex-row mt-2 gap-2">
                <View className="flex-row items-center gap-1">
                    <Icon name="star" size="md" className="text-[rgb(234_179_8)]" />
                    <Text className="font-medium">{repo.stargazers_count}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                    <Icon name="fork" size="md" className="text-[rgb(96_165_250)]" />
                    <Text className="font-medium">{repo.forks_count}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                    <Icon name="globe" size="md" className="text-[rgb(16_185_129)]" />
                    <Text className="font-medium">{repo.language}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                    <Icon name="clock" size="md" className="text-[rgb(96_165_250)]" />
                    <Text className="font-medium">{timesAgo(new Date(repo.updated_at))}</Text>
                </View>
            </View>
        </Animated.View>
    );
};
