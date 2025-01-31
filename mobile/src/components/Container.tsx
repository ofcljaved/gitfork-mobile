import { cn } from '@/lib/clsx';
import { SafeAreaView, ViewProps } from 'react-native';
import  Constants  from 'expo-constants';

interface ContainerProps extends ViewProps { }

const STATUS_BAR_MARGIN = Constants.statusBarHeight + 5;

export const Container = ({ children, ...props }: ContainerProps) => {
    return <SafeAreaView style={{ marginTop: STATUS_BAR_MARGIN }} className={cn(
        'flex flex-1 p-6 pb-0',
        props.className
    )}>{children}</SafeAreaView>;
};
