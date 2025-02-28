import { LayoutChangeEvent, Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/clsx";
import { TABS } from "@/constants"

export const Tabs = ({activeTab, setActiveTab}: { activeTab: number, setActiveTab: (tab: number) => void }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const offset = useSharedValue<number>(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    const handleTabPress = (index: number) => {
        setActiveTab(index);
        offset.value = withTiming(index * dimensions.width / 2);
    };

    const onLayoutChange = ({ nativeEvent: { layout: { width, height } } }: LayoutChangeEvent) => {
        setDimensions({ width, height });
    }

    return (
        <View onLayout={onLayoutChange} className="flex-row items-center bg-background-100 rounded-2xl p-1.5 gap-4 relative">
            {TABS.map((tab, index) => (
                <Pressable
                    onPress={() => handleTabPress(index)}
                    key={index}
                    className="flex-1 flex-row gap-2 items-center justify-center z-10 p-3"
                >
                    <Icon 
                        name={tab === TABS[0] ? 'original' : 'fork'} 
                        size="xl" 
                        className={cn("text-primary-100", activeTab=== index && 'text-primary-200')} 
                    />
                    <Text className="text-center" >{tab}</Text>
                </Pressable>
            ))}
            <Animated.View
                style={[
                    {
                        width: dimensions.width / 2 - 10,
                        height: dimensions.height - 10,
                    },
                    animatedStyles,
                ]}
                className={"absolute mx-1.5 rounded-xl bg-background-0 shadow-soft-1"}
            />
        </View>
    )
}
