import { Container } from "@/components/Container";
import SearchBar from "@/components/search-bar";
import { RepoList } from "@/components/repo-list";
import { User } from "@/components/user";

export default function Home() {
    return (
        <Container className="flex-1">
            <SearchBar />
            <User />
        </Container >
    );

}
//{isLoading && <UserCardSkeleton />}
//{data && <UserCard user={data} />}
//{data && <RepoList original={data.notForkedRepos} forked={data.forkedRepos} />}

