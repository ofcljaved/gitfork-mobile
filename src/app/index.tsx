import { Container } from "@/components/Container";
import SearchBar from "@/components/search-bar";
import { User } from "@/components/user";
import { Repos } from "@/components/repo";

export default function Home() {
    return (
        <Container className="flex-1">
            <SearchBar />
            <User />
            <Repos />
        </Container >
    );

}
