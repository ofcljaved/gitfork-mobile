import { Input } from "@/components/ui/input";
import { UserCard } from "@/components/user-card";
import { RepoList } from "@/components/repo-list";
import { fetchUserDetails } from "@/lib/fetchUserDetails";
import Form from 'next/form';


export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ name: string }>;
}) {
    const q = (await searchParams).name;
    const user = q ? await fetchUserDetails(q) : null;

    return (
        <main className="min-h-svh bg-background max-w-screen-xl mx-auto p-6">
            <Form action="/">
                <Input name="name" placeholder="Enter your github username" />
            </Form>
            {user && <UserCard user={user} />}
            {user &&
                <div className="grid md:grid-cols-2 gap-6">
                    <RepoList title="Original Repositories" repos={user.notForkedRepos} />
                    <RepoList title="Forked Repositories" repos={user.forkedRepos} forked />
                </div>
            }
        </main>
    );
}
