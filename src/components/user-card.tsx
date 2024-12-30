import { UserDetails } from "@/lib/fetchUserDetails";
import { Card, CardContent } from "./ui/card";
import Icon from "./icon";
import { IconKey } from "@/lib/icons";
import Image from "next/image";

export const UserCard = ({ user }: { user: UserDetails }) => {
    return (
        <Card className="border-none my-6">
            <CardContent className="p-0 grid grid-rows-[20px_8rem_1fr]">
                <Image
                    width={564}
                    height={564}
                    src={user.avatarUrl}
                    alt="Profile"
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
        </Card>
    );
}

const StatsCard = ({ icon, label, value }: { icon: IconKey, label: string, value: number }) => (
    <div className="grid gap-x-3 rounded-lg grid-cols-[auto_1fr] items-center">
        <div className="p-2 bg-blue-50 dark:bg-blue-700/20 text-blue-600 rounded-lg row-start-1 row-end-3">
            <Icon icon={icon} size={30} />
        </div>
        <div className="text-sm text-secondary-foreground">{label}</div>
        <div className="font-bold col-start-2">{value}</div>
    </div>
);
