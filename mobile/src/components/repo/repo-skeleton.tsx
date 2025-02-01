import { FlatList, View } from "react-native";
import { Sekelton } from "../ui/skeleton";

export const RepoSkeleton = () => {

    return (
        <View className="flex-1" >
            <Sekelton className="rounded-2xl h-12" />
            <FlatList
                data={Array(5).fill(null)}
                renderItem={() => <RepoSkeletonCard />}
                contentContainerClassName="gap-4"
                className="my-4"
            />
        </View>
    );
};

const RepoSkeletonCard = () => {
    return (
        <View className="p-4 bg-background-0/40 border-hairline border-primary-50/50 rounded-xl gap-2">
            <Sekelton className="h-6 w-1/2" />
            <Sekelton className="h-4" />
            <Sekelton className="h-6" />
        </View>
    );
};
