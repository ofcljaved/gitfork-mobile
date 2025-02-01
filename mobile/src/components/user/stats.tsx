import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { IconKey } from "@/lib/icon";

export const StatsCard = ({ label, value, icon }: { label: string, value: number, icon: IconKey }) => {
    return (
        <View className="flex items-center flex-row gap-1 border-hairline border-primary-50/50 bg-background-50/50 rounded-full px-3 py-1">
            <Icon size="xs" name={icon} className="text-primary-400" />
            <Text size="md" bold >{value}</Text>
            <Text size="sm">{label}</Text>
        </View>
    );
};
