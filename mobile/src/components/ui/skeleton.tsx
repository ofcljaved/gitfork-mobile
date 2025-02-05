import React, { forwardRef, memo, useCallback, useEffect, useState } from "react"
import { LayoutChangeEvent, View, ViewProps } from "react-native"
import type { VariantProps } from "@gluestack-ui/nativewind-utils"
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { LinearGradient } from "expo-linear-gradient";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { useColorScheme } from "nativewind";

const boxStyle = tva({
    base: 'rounded-3xl bg-background-200 dark:bg-background-50 overflow-hidden'
});

type IBoxProps = ViewProps &
    VariantProps<typeof boxStyle> & { className?: string }

const Sekelton = memo(forwardRef<React.ElementRef<typeof View>, IBoxProps>(
    ({ className, ...props }, ref) => {
        const { colorScheme } = useColorScheme();
        const [width, setWidth] = useState(0);
        const translateX = useSharedValue(-50);

        const darkColors = ['#262524', '#3f3e3e', '#262524'] as const;
        const lightColors = ['#dbdbdb', '#f2f2f2', '#dbdbdb'] as const;
        const colors = colorScheme === 'dark' ? darkColors : lightColors;
        const animatedStyles = useAnimatedStyle(() => ({
            transform: [{ translateX: translateX.value }],
        }));

        const onLayout = useCallback((e: LayoutChangeEvent) => {
            setWidth(e.nativeEvent.layout.width);
        }, []);

        useEffect(() => {
            translateX.value = withRepeat
                (withTiming( width * 2.5, { duration: 1000, easing: Easing.linear  }),
                -1, 
                false
            );
        }, [width])

        return (
            <View 
                ref={ref} 
                {...props} 
                className={boxStyle({ class: className })} 
                onLayout={onLayout}
            >
                {props.children}
                <Animated.View className="flex-1 w-full" style={animatedStyles} >
                    <LinearGradient
                        colors={colors}
                        style={{
                            flex: 1,
                            width: width / 4,
                        }}
                        start={{
                            x: -1,
                            y: 0.5,
                        }}
                        end={{
                            x: 2,
                            y: 0.5,
                        }}
                        locations={[0.3, 0.5, 0.7]}
                    />
                </Animated.View>
            </View >
        )
    }
));

Sekelton.displayName = 'Skeleton'
export { Sekelton }
