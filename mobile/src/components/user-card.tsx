import { NO_BIO } from "@/constants";
import { UserDetails } from "@/types";
import { Image, View } from "react-native";
import { Text } from "./ui/text";
import { Icon } from "./ui/icon";
import { IconKey } from "@/lib/icon";

export const UserCard = ({ user }: { user: UserDetails }) => {
    return (
        <View>
            <View className="flex flex-row gap-4 items-center mt-4">
                <Image
                    source={{ uri: user.avatarUrl }}
                    className="w-16 h-16 rounded-full"
                />
                <View className="flex-1">
                    <Text size="2xl" bold className="text-primary-600">{user.name}</Text>
                    <Text size="md" italic >{user.bio ?? NO_BIO}</Text>
                </View>
            </View>
            <View className="flex flex-row flex-wrap gap-2 my-4">
                <StatsCard label="Repos" value={user.publicRepos} icon="repo" />
                <StatsCard label="Stars" value={user.totalStars} icon="star" />
                <StatsCard label="Forks" value={user.publicRepos} icon="fork" />
                <StatsCard label="Followers" value={user.followers} icon="follower" />
            </View>
        </View>
    );
};

const StatsCard = ({ label, value, icon }: { label: string, value: number, icon: IconKey }) => {
    return (
        <View className="flex items-center flex-row gap-1 border-hairline border-primary-50/50 bg-background-50/50 rounded-full px-3 py-1">
            <Icon size="xs" name={icon} className="text-primary-400" />
            <Text size="md" bold >{value}</Text>
            <Text size="sm">{label}</Text>
        </View>
    );
};

export const UserCardSkeleton = () => {
    return (
        <View>
            <View className="flex flex-row gap-4 items-center mt-4">
                <View className="w-16 h-16 rounded-full bg-background-50" />
                <View className="flex-1 gap-1">
                    <View className="flex-1 h-6 bg-background-50 rounded-full" />
                    <View className="flex-1 h-4 bg-background-50 rounded-full"/>
                </View>
            </View>
            <View className="flex flex-row flex-wrap gap-2 my-4">
                <StatsCardSkeleton length={100} />
                <StatsCardSkeleton length={90} />
                <StatsCardSkeleton length={90} />
                <StatsCardSkeleton length={120}/>
            </View>
        </View>
    );

}

const StatsCardSkeleton = ({ length = 100 }) => {
    return (
        <View style={{ width: length }} className="h-8 bg-background-50 rounded-full">
        </View>
    );
}
