import { RepoList } from "@/components/repo-list";
import { fetchUserDetails, UserDetails } from "@/lib/fetchUserDetails";
import { REPO_TYPES } from "@/constant";
import { UserCard } from "@/components/user-card";

type RepoType = typeof REPO_TYPES[number];
export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ type: RepoType }>
    searchParams: Promise<{ name: string }>
}) {
    const type = (await params).type;
    const q = (await searchParams).name;

    const user = q ? await fetchUserDetails(q) : null;

    if (!user) return <h1>User not found</h1>;

    if (!REPO_TYPES.includes(type)) {
        return (
            <h1>Something went wrong</h1>
        );
    }


    return (
        <>
            <UserCard user={user} small />
            <RepoList
                title={type === 'original' ? 'Original Repositories' : 'Forked Repositories'}
                repos={type === 'original' ? user.notForkedRepos : user.forkedRepos}
                forked={type === 'forked'}
            />
        </>
    );
}
