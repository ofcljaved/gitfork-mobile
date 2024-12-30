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
    const userUrl = `https://api.github.com/users/${username}`;
    const reposUrl = `https://api.github.com/users/${username}/repos`;
    const starsUrl = `https://api.github.com/users/${username}/starred`;
    const perPage = 100;

    try {
        const userResponse = await fetch(userUrl);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();

        let hasMoreRepos = true;
        let page = 1;
        let allRepos: Repo[] = [];
        while (hasMoreRepos) {
            const reposResponse = await fetch(`${reposUrl}?page=${page}&per_page=${perPage}`);
            const reposData = await reposResponse.json();
            allRepos = allRepos.concat(reposData);
            hasMoreRepos = reposData.length === perPage;
            page++;
        }
        const forkedRepos = allRepos.filter((repo) => repo.fork).sort((a, b) => (new Date(b.updated_at)).getTime() - (new Date(a.updated_at)).getTime());
        const notForkedRepos = allRepos.filter((repo) => !repo.fork).sort((a, b) => (new Date(b.updated_at)).getTime() - (new Date(a.updated_at)).getTime());

        page = 1;
        let totalStars = 0;
        let hasMoreStars = true;
        while (hasMoreStars) {
            const starsResponse = await fetch(`${starsUrl}?page=${page}&per_page=${perPage}`);
            const starsData = await starsResponse.json();
            totalStars += starsData.length;
            hasMoreStars = starsData.length === perPage;
            page++;
        }

        const data = {
            username: userData.login,
            avatarUrl: userData.avatar_url,
            name: userData.name,
            bio: userData.bio,
            followers: userData.followers,
            publicRepos: userData.public_repos,
            totalStars,
            forkedRepos,
            notForkedRepos,
        };

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
