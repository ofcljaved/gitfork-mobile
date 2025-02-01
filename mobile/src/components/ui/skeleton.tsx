import React, { forwardRef } from "react"
import { View, ViewProps } from "react-native"
import type { VariantProps } from "@gluestack-ui/nativewind-utils"
import { tva } from '@gluestack-ui/nativewind-utils/tva';

const boxStyle = tva({
    base: 'rounded-3xl bg-background-50'
});

type IBoxProps = ViewProps &
    VariantProps<typeof boxStyle> & { className?: string }

const Sekelton = forwardRef<React.ElementRef<typeof View>, IBoxProps>(
    ({ className, ...props }, ref) => {
        return (
            <View ref={ref} {...props} className={boxStyle({ class: className })} />
        )
    }
)

Sekelton.displayName = 'Skeleton'
export { Sekelton }
