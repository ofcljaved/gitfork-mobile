import { Sekelton } from "@/components/ui/skeleton";
import { View } from "react-native";

export const UserCardSkeleton = () => {
    return (
        <View>
            <View className="flex flex-row gap-4 items-center mt-4">
                <Sekelton className="w-16 h-16 rounded-full" />
                <View className="flex-1 gap-1">
                    <Sekelton className="flex-1 h-6" />
                    <Sekelton className="flex-1 h-4" />
                </View>
            </View>
            <View className="flex flex-row flex-wrap gap-2 my-4">
                <StatsCardSkeleton length={100} />
                <StatsCardSkeleton length={90} />
                <StatsCardSkeleton length={90} />
                <StatsCardSkeleton length={120} />
            </View>
        </View>
    );

}

const StatsCardSkeleton = ({ length = 100 }) => {
    return (
        <Sekelton style={{ width: length }} className="h-8">
        </Sekelton>
    );
}
