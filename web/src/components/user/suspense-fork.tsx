import { fetchUserRepos } from "@/lib/fetchUserDetails";
import { StatsCard } from "./stats-card";

export const ForkStatsCard = async ({ query }: { query: string }) => {
    const repo = await fetchUserRepos(query);

    return (
        <StatsCard label="Forks" value={repo.forkedRepos.length} small />
    )
}
