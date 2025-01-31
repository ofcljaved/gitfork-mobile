'use client';
import React from 'react';
import { createIcon } from '@gluestack-ui/icon';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { cssInterop } from 'nativewind';
import { VariantProps } from '@gluestack-ui/nativewind-utils';
import { PrimitiveIcon, IPrimitiveIcon, Svg } from '@gluestack-ui/icon';
import icons, { IconKey } from '@/lib/icon';

export const UIIcon = createIcon({
  Root: PrimitiveIcon,
}) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof PrimitiveIcon> &
    React.RefAttributes<React.ElementRef<typeof Svg>>
>;

const iconStyle = tva({
  base: 'text-typography-950 fill-none pointer-events-none',
  variants: {
    size: {
      '2xs': 'h-3 w-3',
      'xs': 'h-3.5 w-3.5',
      'sm': 'h-4 w-4',
      'md': 'h-[18px] w-[18px]',
      'lg': 'h-5 w-5',
      'xl': 'h-6 w-6',
    },
  },
});

cssInterop(UIIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: 'classNameColor',
      stroke: true,
    },
  },
});

type IIConProps = IPrimitiveIcon &
  VariantProps<typeof iconStyle> &
  React.ComponentPropsWithoutRef<typeof UIIcon> & 
  { name?: IconKey };

const Icon = React.forwardRef<React.ElementRef<typeof Svg>, IIConProps>(
  ({ size = 'md', className, ...props }, ref) => {

    if(props.name) {
        props.as = icons[props.name];
    }

    if (typeof size === 'number') {
      return (
        <UIIcon
          ref={ref}
          {...props}
          className={iconStyle({ class: className })}
          size={size}
        />
      );
    } else if (
      (props.height !== undefined || props.width !== undefined) &&
      size === undefined
    ) {
      return (
        <UIIcon
          ref={ref}
          {...props}
          className={iconStyle({ class: className })}
        />
      );
    }
    return (
      <UIIcon
        ref={ref}
        {...props}
        className={iconStyle({ size, class: className })}
      />
    );
  }
);

export { Icon };
