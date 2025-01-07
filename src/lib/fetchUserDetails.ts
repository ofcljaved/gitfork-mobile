import { API_URL } from "@/constant";

export interface Repo {
    name: string;
    description: string;
    fork: boolean;
    forks_count: number;
    stargazers_count: number;
    updated_at: string;
    language: string;
    html_url: string;
}

export interface UserDetails {
    username: string;
    avatarUrl: string;
    name: string;
    bio: string;
    followers: number;
    publicRepos: number;
    totalStars: number;
    forkedRepos: Repo[];
    notForkedRepos: Repo[];
}

export const fetchUserDetails = async (username: string) => {
    const userUrl = `${API_URL}/${username}`;
    const reposUrl = `${API_URL}/${username}/repos`;
    const starsUrl = `${API_URL}/${username}/starred?page=1&per_page=1`;
    const perPage = 100;

    console.time('fetchUserDetails');

    try {
        const userResponse = await fetch(userUrl, {
            cache: 'force-cache',
        });
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();

        const starsResponse = await fetch(starsUrl, {
            cache: 'force-cache',
        });
        const linkHeader = starsResponse.headers.get("link");
        const lastPageLink = linkHeader?.split(",").find((link) => link.includes('rel="last"'));
        const noOfStars = new URLSearchParams(lastPageLink?.split("?")[1].split(">")[0]).get("page");

        const totalRepoPages = Math.ceil(userData.public_repos / perPage);

        const repoRequests = Array.from({ length: totalRepoPages }, (_, i) =>
            fetch(`${reposUrl}?page=${i + 1}&per_page=${perPage}`, {
                cache: 'force-cache',
            })
        );

        const repoResponses = await Promise.all(repoRequests);
        const allRepos = repoResponses.flat();
        //
        ////let hasMoreRepos = true;
        ////let page = 1;
        ////let allRepos: Repo[] = [];
        ////while (hasMoreRepos) {
        ////    const reposResponse = await fetch(`${reposUrl}?page=${page}&per_page=${perPage}`, {
        ////        cache: 'force-cache',
        ////    });
        ////    const reposData = await reposResponse.json();
        ////    allRepos = allRepos.concat(reposData);
        ////    hasMoreRepos = reposData.length === perPage;
        ////    page++;
        ////}
        const forkedRepos = allRepos.filter((repo) => repo.fork).sort((a, b) => (new Date(b.updated_at)).getTime() - (new Date(a.updated_at)).getTime());
        const notForkedRepos = allRepos.filter((repo) => !repo.fork).sort((a, b) => (new Date(b.updated_at)).getTime() - (new Date(a.updated_at)).getTime());

        const data = {
            username: userData.login,
            avatarUrl: userData.avatar_url,
            name: userData.name,
            bio: userData.bio,
            followers: userData.followers,
            publicRepos: userData.public_repos,
            totalStars:Number(noOfStars || 0),
            forkedRepos,
            notForkedRepos,
        };

        console.timeEnd('fetchUserDetails');
        return data;
    } catch (error) {
        console.error(error);
        console.timeEnd('fetchUserDetails');
        return null;
    }
}
