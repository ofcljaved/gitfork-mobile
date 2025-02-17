import icons, { IconKey } from '@/lib/icons';
import React from 'react';
import { IconBaseProps } from 'react-icons';

export interface IconProps extends IconBaseProps {
  icon: IconKey;
}
function Icon({ icon, ...props }: IconProps) {
  const Comp = icons[icon];
  return <Comp {...props} />;
};

export default Icon;
