import { NO_BIO } from "@/constants";
import { UserDetails } from "@/types";
import { Image, Text, View } from "react-native";

export const UserCard = ({ user }: { user: UserDetails }) => {
    return (
        <View className="flex flex-row gap-4 items-center mt-4">
            <Image
                source={{ uri: user.avatarUrl }}
                className="w-24 h-24 rounded-full"
            />
            <View className="flex-1">
                <Text className="text-3xl font-bold">{user.name}</Text>
                <Text className="text-sm italic">{user.bio ?? NO_BIO}</Text>
                <View className="flex flex-row flex-wrap gap-x-3 mt-1">
                    <StatsCard label="Repos" value={user.publicRepos} />
                    <StatsCard label="Followers" value={user.followers} />
                    <StatsCard label="Forks" value={user.publicRepos} />
                    <StatsCard label="Stars" value={user.totalStars} />
                </View>
            </View>
        </View>
    );
};

const StatsCard = ({ label, value }: { label: string, value: number }) => {
    return (
        <View className="flex flex-row gap-1">
            <Text className="text-lg font-bold">{value}</Text>
            <Text className="text-lg text-secondary-foreground">{label}</Text>
        </View>
    );
};
