import { Suspense } from "react";
import { UserCardSkeleton } from "./user-skeleton";
import { UserCard } from "./user-card";

export const User = () => {
    return (
        <Suspense fallback={<UserCardSkeleton />}>
            <UserCard />
        </Suspense>
    );
};
