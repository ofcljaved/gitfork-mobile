import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {

    return (
        <QueryClientProvider client={queryClient}>
            <GluestackUIProvider mode='system'>
                {children}
            </GluestackUIProvider>
        </QueryClientProvider>
    );
}

