import { Card } from "@/components/ui/card";
import { HTMLAttributes } from "react";

export const BaseUserCard = ({ children }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <Card className="bg-transparent border-none my-6">
            {children}
        </Card>
    );
}
