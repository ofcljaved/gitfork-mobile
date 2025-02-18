import { fetchUserRepos } from "@/lib/fetchUserDetails";
import { StatsCard } from "@/components/user/stats-card";

export const ForkStatsCard = async ({ query }: { query: string }) => {
    const repo = await fetchUserRepos(query);

    return (
        <StatsCard icon="gitFork" label="Forks" value={repo.forkedRepos.length} />
    )
}
