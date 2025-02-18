import { Repo } from "@/lib/fetchUserDetails";
import Icon from "@/components/icon";
import { RepoCard } from "@/components/repo/repo-card";
import Link from "next/link";
import { LINES } from "@/constant/stalker-humor";

const randomOneLiner = () => LINES[Math.floor(Math.random() * LINES.length)];

interface RepoListProps {
    title: string;
    repos: Repo[];
    noOfRepos?: number;
    username?: string;
    forked?: boolean;
}

export const RepoList: React.FC<RepoListProps> = ({ title, username, repos, forked, noOfRepos }) => {
    noOfRepos = noOfRepos ?? repos.length;
    const link = `/repos/${forked ? 'forked' : 'original'}?name=${username}`;
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 px-2">
                <Icon icon={forked ? "gitFork" : "book"} size={30} />
                {title}
            </h3>
            {repos.slice(0, noOfRepos).map((repo, i) => (
                <RepoCard key={i} repo={repo} />
            ))}
            {repos.length > noOfRepos && (
                <div className="grid justify-items-center gap-2 px-2 text-sm text-muted-foreground shadow-[0_-2rem_10rem_2rem] shadow-background">
                    <p><i>~{randomOneLiner()}~</i></p>
                    <Link href={link} className=" text-blue-400">
                        <span className="mx-2 text-muted-foreground">
                            {repos.length - noOfRepos} more
                        </span>
                        View all
                    </Link>
                </div>
            )}
        </div>
    );
};
