import { Suspense } from "react";
import { UserCardSkeleton } from "./user-skeleton";
import { UserCard } from "./user-card";
import { useSearchStore } from "@/store/search";

export const User = () => {
    const { search } = useSearchStore();

    return (
        <Suspense fallback={<UserCardSkeleton />}>
            {search && <UserCard />}
        </Suspense>
    );
};
