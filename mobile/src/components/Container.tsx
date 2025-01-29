import { cn } from '@/lib/clsx';
import { SafeAreaView, ViewProps } from 'react-native';
import  Constants  from 'expo-constants';

interface ContainerProps extends ViewProps { }

export const Container = ({ children, ...props }: ContainerProps) => {
    return <SafeAreaView style={{marginTop: Constants.statusBarHeight}} className={cn(
        'flex flex-1 p-6 pb-0',
        props.className
    )}>{children}</SafeAreaView>;
};
