import { UserCard } from "@/components/user-card";
import { RepoList } from "@/components/repo-list";
import { fetchUserDetails } from "@/lib/fetchUserDetails";
import Form from 'next/form';
import Icon from "@/components/icon";
import { ThemeChange } from "@/components/ui/theme-change";
import FormLoader from "@/components/form-loader";
import { NO_OF_REPOS } from "@/constant";


export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ name: string }>;
}) {
    const q = (await searchParams).name;
    const user = q ? await fetchUserDetails(q) : null;

    return (
        <>
            <Form action="/" className="grid grid-cols-1 grid-flow-col gap-2 items-center">
                <div className="has-[:focus]:text-muted-foreground animate-rotate flex items-center gap-2 w-full rounded-lg border border-transparent bg-shiny-border text-secondary px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1">
                    <Icon icon="search" className="text-secondary-foreground" size={24} />
                    <input name="name" placeholder="Enter your github username" autoComplete="off" className="text-foreground bg-transparent w-full outline-none border-none" />
                </div>
                <ThemeChange />
                <FormLoader />
            </Form>
            {user && <UserCard user={user} />}
            {user &&
                <div className="grid md:grid-cols-2 gap-6">
                    <RepoList title="Original Repositories" username={user.username} repos={user.notForkedRepos} noOfRepos={NO_OF_REPOS} />
                    <RepoList title="Forked Repositories" username={user.username} repos={user.forkedRepos} noOfRepos={NO_OF_REPOS} forked />
                </div>
            }
        </>
    );
}
