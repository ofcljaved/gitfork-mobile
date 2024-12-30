import { Repo } from "@/lib/fetchUserDetails";
import Icon from "./icon";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { timesAgo } from "@/lib/timesAgo";

export const RepoList = ({ title, repos, forked }: { title: string, forked?: boolean, repos: Repo[] }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 px-2">
                <Icon icon={forked ? "gitFork" : "book"} size={30} />
                {title}
            </h3>
            {repos.map((repo, i) => (
                <RepoCard key={i} repo={repo} />
            ))}
        </div>
    );
};

const RepoCard = ({ repo }: { repo: Repo }) => {
    return (
        <Card className="group bg-muted/30 border-muted-foreground/10 hover:bg-muted/50 transition-colors text-muted-foreground">
            <Link href={repo.html_url} target="_blank">
                <CardContent className="p-5">
                    <div className="space-y-2">
                        <h4 className="font-semibold text-lg text-foreground group-hover:text-blue-400">
                            {repo.name}
                        </h4>
                        <p className="truncate">{
                            repo.description ?? <span className="italic text-sm">~Description? Nah, who needs context anyway~</span>
                        }</p>
                    </div>
                    <div className="*:flex *:items-center *:gap-1 mt-4 flex flex-wrap gap-4 text-sm">
                        <span>
                            <Icon icon="star" size={16} className="text-yellow-500" />
                            {repo.stargazers_count}
                        </span>
                        <span>
                            <Icon icon="gitFork" size={16} className="text-blue-400" />
                            {repo.forks_count}
                        </span>
                        <span>
                            <Icon icon="globe" size={16} className="text-emerald-500" />
                            {repo.language}
                        </span>
                        <span className="flex items-center gap-1">
                            <Icon icon="clock" size={16} className="text-blue-400" />
                            {timesAgo(new Date(repo.updated_at))}
                        </span>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
};
