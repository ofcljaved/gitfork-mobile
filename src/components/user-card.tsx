import { UserDetails } from "@/lib/fetchUserDetails";
import { Card, CardContent } from "./ui/card";
import Icon from "./icon";
import { IconKey } from "@/lib/icons";
import Image from "next/image";

export const UserCard = ({ user }: { user: UserDetails }) => {
    return (
        <Card className="border-none my-6">
            <CardContent className="grid grid-rows-[20px_8rem_1fr]">
                <Image
                    width={564}
                    height={564}
                    src={user.avatarUrl}
                    alt="Profile"
                    className="w-32 h-32 mx-6 rounded-lg z-10 shadow-sm border border-primary row-start-1 row-end-3 col-start-1"
                />
                <div className="border border-muted-foreground rounded-xl grid gap-6 items-start row-start-2 row-end-4 col-start-1 grid-rows-subgrid">
                    <div/>
                    <div className="space-y-4 flex-1">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                            <p className="text-gray-600">{user.bio}</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatsCard icon={"book"} label="Repositories" value={user.publicRepos} />
                            <StatsCard icon={"users"} label="Followers" value={user.followers} />
                            <StatsCard icon={"gitFork"} label="Forks" value={user.forkedRepos.length} />
                            <StatsCard icon={"star"} label="Stars" value={user.totalStars} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

const StatsCard = ({ icon, label, value }: { icon: IconKey, label: string, value: number }) => (
    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Icon icon={icon} />
        </div>
        <div>
            <div className="text-sm text-gray-600">{label}</div>
            <div className="font-bold text-gray-900">{value}</div>
        </div>
    </div>
);
