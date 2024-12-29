import { Input } from "@/components/ui/input";
import { UserCard } from "@/components/user-card";
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
            <UserCard user={user} />
        </main>
    );
}
