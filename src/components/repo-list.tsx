import { Repo } from "@/lib/fetchUserDetails";
import Icon from "./icon";

export const RepoList = ({ title, repos, forked }: { title: string, forked?: boolean, repos: Repo[] }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 px-2 text-gray-900">
                <Icon icon={forked ? "gitFork" : "book"} />
                {title}
            </h3>
            {repos.map((repo, i) => (
                <RepoCard key={i} repo={repo} />
            ))}
        </div>
    );
};

const RepoCard = ({ repo }: { repo: Repo}) => {
    return (
        <div className="flex flex-col items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Icon icon={"book"} />
            </div>
            <div>
                <div className="text-sm text-gray-600">{repo.name}</div>
                <div className="font-bold text-gray-900">{repo.description}</div>
            </div>
        </div>
    );
};
