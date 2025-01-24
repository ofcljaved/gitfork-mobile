import { cn } from '@/lib/clsx';
import { SafeAreaView, ViewProps } from 'react-native';

interface ContainerProps extends ViewProps { }

export const Container = ({ children, ...props }: ContainerProps) => {
    return <SafeAreaView className={cn(
        'flex flex-1 m-6 mb-0',
        props.className
    )}>{children}</SafeAreaView>;
};
