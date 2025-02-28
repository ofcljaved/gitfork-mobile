import { Suspense } from "react";
import { RepoList } from "./repo-list";
import { useSearchStore } from "@/store/search";
import { RepoSkeleton } from "./repo-skeleton";

export const Repos = () => {
    const { search } = useSearchStore();

    return (
        <Suspense fallback={<RepoSkeleton />}>
            {search && <RepoList />}
        </Suspense>
    )
}
