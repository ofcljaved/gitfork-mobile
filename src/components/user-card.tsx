import { UserDetails } from "@/lib/fetchUserDetails";
import { Card, CardContent } from "./ui/card";
import Icon from "./icon";
import { IconKey } from "@/lib/icons";
import Image from "next/image";

export const UserCard = ({ user }: { user: UserDetails }) => {
    return (
        <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <Image
                        width={64}
                        height={64}
                        src={user.avatarUrl}
                        alt="Profile"
                        className="w-32 h-32 rounded-lg shadow-sm border border-gray-200"
                    />
                    <div className="space-y-4 flex-1">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                            <p className="text-gray-600">{user.bio}</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatsCard icon={"book"} label="Repositories" value={user.publicRepos} />
                            <StatsCard icon={"users"} label="Followers" value={user.followers}/>
                            <StatsCard icon={"gitFork"} label="Forks" value={user.forkedRepos.length}/>
                            <StatsCard icon={"star"} label="Stars" value={user.totalStars}/>
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
