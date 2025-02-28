import { NO_BIO } from "@/constants";
import { Image, View } from "react-native";
import { Text } from "@/components/ui/text";
import { StatsCard } from "./stats";
import { useSearchStore } from "@/store/search";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchUser } from "@/actions/fetchUser";
import { fetchRepos } from "@/actions/fetchRepos";
import { memo, Suspense } from "react";
import { StatsCardSkeleton } from "./user-skeleton";

export const UserCard = memo(() => {
    const { search } = useSearchStore();
    const { data: user } = useSuspenseQuery({
        queryKey: ["user", search],
        queryFn: () => fetchUser(search),
    });

    if (!user) return null;

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
                <ForkCount />
                <StatsCard label="Followers" value={user.followers} icon="follower" />
            </View>
        </View>
    );
});

const ForkCount = memo(() => {
    const { search } = useSearchStore();
    const { data: repos } = useSuspenseQuery({
        queryKey: ["repos", search],
        queryFn: () => fetchRepos(search),
    });

    return (
        <Suspense fallback={<StatsCardSkeleton />}>
            <StatsCard label="Forks" value={repos?.forkedRepos.length ?? 0} icon="fork" />
        </Suspense>
    );
});

