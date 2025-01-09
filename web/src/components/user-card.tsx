import { UserDetails } from "@/lib/fetchUserDetails";
import { Card, CardContent } from "./ui/card";
import Icon from "./icon";
import { IconKey } from "@/lib/icons";
import Image from "next/image";
import { cn } from "@/lib/utils";

const BaseUserCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <Card className="bg-transparent border-none my-6">
            {children}
        </Card>
    );
}

export const SmallUserCard = ({ user }: { user: UserDetails }) => {
    return (
        <BaseUserCard>
            <CardContent className="p-0 grid grid-cols-[auto_1fr] items-center gap-6">
                <Image
                    width={164}
                    height={164}
                    src={user.avatarUrl}
                    alt="Profile"
                    priority
                    loading="eager"
                    className="w-16 h-16 rounded-lg shadow-sm border border-primary"
                />
                <div className="grid items-start">
                    <h2 className="text-2xl font-bold col-span-full">{user.name}</h2>
                    <div className="flex flex-wrap gap-x-4">
                        <StatsCard label="Repositories" value={user.publicRepos} small />
                        <StatsCard label="Followers" value={user.followers} small />
                        <StatsCard label="Forks" value={user.forkedRepos.length} small />
                        <StatsCard label="Stars" value={user.totalStars} small />
                    </div>
                </div>
            </CardContent>
        </BaseUserCard>
    );
}
export const UserCard = ({ user, small }: { user: UserDetails, small?: boolean }) => {
    if (small) return <SmallUserCard user={user} />;
    return (
        <BaseUserCard>
            <CardContent className="p-0 grid grid-rows-[20px_8rem_1fr]">
                <Image
                    width={564}
                    height={564}
                    src={user.avatarUrl}
                    alt="Profile"
                    priority
                    loading="eager"
                    className="w-32 h-32 mx-6 rounded-lg z-10 shadow-sm border border-primary row-start-1 row-end-3 col-start-1"
                />
                <div className="p-6 border border-muted-foreground/30 rounded-xl grid gap-6 items-start row-start-2 row-end-4 col-start-1 grid-rows-subgrid">
                    <div />
                    <div className="grid grid-cols-2 sm:grid-cols-[1fr_2fr] gap-4">
                        <h2 className="text-2xl font-bold col-span-full">{user.name}</h2>
                        <p className="text-gray-600 col-span-full text-balance">{
                            user.bio ??
                            <span className="italic text-gray-400">~No bio... YOU must think very highly of yourself~</span>
                        }</p>
                        <StatsCard icon={"book"} label="Repositories" value={user.publicRepos} />
                        <StatsCard icon={"users"} label="Followers" value={user.followers} />
                        <StatsCard icon={"gitFork"} label="Forks" value={user.forkedRepos.length} />
                        <StatsCard icon={"star"} label="Stars" value={user.totalStars} />
                    </div>
                </div>
            </CardContent>
        </BaseUserCard>
    );
}

const StatsCard = (
    {
        label,
        value,
        icon,
        small
    }: {
        label: string,
        value: number,
        icon?: IconKey,
        small?: boolean
    }) => (
    <div className={cn(
            "grid gap-x-3 rounded-lg grid-cols-[auto_1fr] items-center",
            small && "grid-x-1 grid-flow-dense"
        )}>
        {icon &&
            <div className="p-2 bg-blue-50 dark:bg-blue-700/20 text-blue-600 rounded-lg row-start-1 row-end-3">
                <Icon icon={icon} size={30} />
            </div>
        }
        <div className={cn("text-sm text-secondary-foreground", small && "col-start-2")}>{label}</div>
        <div className={cn("font-bold", small && "col-start-1")}>{value}</div>
    </div>
);
