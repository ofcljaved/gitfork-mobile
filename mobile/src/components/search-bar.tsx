import { useEffect } from 'react';
import { Input, InputField, InputSlot } from "./ui/input";
import { Icon } from "./ui/icon";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { useSearchStore } from '@/store/search';

export default function SearchBar() {
    const { setSearch } = useSearchStore();

    const handleSubmit = (value: string) => {
        setSearch(value);
    }
    const offset = useSharedValue<number>(0);

    const animatedStyles = useAnimatedStyle(() => ({
        width: interpolate(offset.value, [0, 1], [25, 55]),
        height: interpolate(offset.value, [0, 1], [25, 10]),
        opacity: interpolate(offset.value, [0, 1], [0.5, 1]),
    }));


    useEffect(() => {
        offset.value = withRepeat(withTiming(1, { duration: 1750 }), -1, true);
    }, [])
    return (
        <Input
            variant="outline"
            size="xl"
            className="rounded-lg relative overflow-auto"
        >
            <InputSlot className="w-6 h-6 ml-2">
                <Icon className="text-primary-100" name="search" />
            </InputSlot>
            <InputField
                placeholder="Enter Text here..."
                onSubmitEditing={(e) => handleSubmit(e.nativeEvent.text)}
                autoCapitalize='none'
                inputMode='search'
            />
            <Animated.View
                style={[animatedStyles]}
                className="absolute -z-10 rounded-lg rounded-r-[0px] rounded-bl-[0px] border-t border-l -left-[0.5px] -top-[0.5px] border-[#8c98f5]"
            />
        </Input>
    )
}
