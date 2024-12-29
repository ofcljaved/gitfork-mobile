import icons, { IconKey } from '@/lib/icons';
import React, { FC } from 'react';
import { IconBaseProps } from 'react-icons';

export interface IconProps extends IconBaseProps {
  icon: IconKey;
}
const Icon: FC<IconProps> = ({ icon, ...props }) => {
  const Comp = icons[icon];
  return <Comp {...props} />;
};

export default Icon;
