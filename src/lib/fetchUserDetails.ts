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

export interface UserData {
  username: string;
  avatarUrl: string;
  name: string;
  bio: string;
  followers: number;
  publicRepos: number;
}

export interface UserStars {
  totalStars: number;
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

const fetchUserData = async (username: string): Promise<UserData | null> => {
  const userUrl = `${API_URL}/${username}`;
  try {
    const userResponse = await fetch(userUrl, {
      cache: "force-cache",
    });
    if (!userResponse.ok) throw new Error("Failed to fetch user data");
    const userData = await userResponse.json();
    return {
      username: userData.login,
      avatarUrl: userData.avatar_url,
      name: userData.name,
      bio: userData.bio,
      followers: userData.followers,
      publicRepos: userData.public_repos,
    };
  } catch (error) {
    console.error("Error fetching user data", { cause: error });
    return null;
  }
};

const fetchUserStarCount = async (
  username: string,
): Promise<UserStars | null> => {
  const starsUrl = `${API_URL}/${username}/starred?page=1&per_page=1`;
  try {
    const starsResponse = await fetch(starsUrl, {
      cache: "force-cache",
    });
    const linkHeader = starsResponse.headers.get("link");
    if (!linkHeader) throw new Error("No link header found");

    const lastPageLink = linkHeader
      .split(",")
      .find((link) => link.includes('rel="last"'));
    if (!lastPageLink) throw new Error("No last page link found");

    const noOfStars = new URLSearchParams(
      lastPageLink.split("?")[1].split(">")[0],
    ).get("page");
    if (!noOfStars) throw new Error("No no of stars found");

    return {
      totalStars: Number(noOfStars),
    };
  } catch (error) {
    console.error("Error fetching user star count", { cause: error });
    return null;
  }
};

export interface UserAndStars extends UserData, UserStars {}
export const fetchUserAndStars = async (
  username: string,
): Promise<UserAndStars | null> => {
  const initialData: UserAndStars = {
    username: "",
    avatarUrl: "",
    name: "",
    bio: "",
    followers: 0,
    publicRepos: 0,
    totalStars: 0,
  };
  try {
    const response = await Promise.allSettled([
      fetchUserData(username),
      fetchUserStarCount(username),
    ]);
    const responseData = response.reduce<UserAndStars>((obj, curr) => {
      if (curr.status === "fulfilled") {
        obj = { ...obj, ...curr.value };
      }
      return obj;
    }, initialData);
    return responseData;
  } catch (error) {
    console.error("Error fetching user and stars", { cause: error });
    return null;
  }
};

export const fetchUserRepos = async (username: string) => {
  const userUrl = `${API_URL}/${username}`;
  const reposUrl = `${API_URL}/${username}/repos`;
  const perPage = 100;

  try {
    const userResponse = await fetch(userUrl);
    if (!userResponse.ok) throw new Error("Failed to fetch user data");
    const userData = await userResponse.json();
    const totalRepoPages = Math.ceil(userData.public_repos / perPage);

    const repoRequests = Array.from(
      { length: totalRepoPages },
      async (_, i) => {
        const res = await fetch(
          `${reposUrl}?page=${i + 1}&per_page=${perPage}&sort=updated`,
        );
        return await res.json();
      },
    );

    const repoResponses = await Promise.allSettled(repoRequests);

    const allRepos = repoResponses
      .flatMap((res) => {
        if (res.status === "fulfilled") {
          return res.value;
        }
        return [];
      })
      .reduce<{ forkedRepos: Repo[]; notForkedRepos: Repo[] }>(
        (acc, curr) => {
          const repo = {
            name: curr.name,
            description: curr.description,
            fork: curr.fork,
            forks_count: curr.forks_count,
            stargazers_count: curr.stargazers_count,
            updated_at: curr.updated_at,
            language: curr.language,
            html_url: curr.html_url,
          };
          if (repo.fork) {
            acc.forkedRepos.push(repo);
          } else {
            acc.notForkedRepos.push(repo);
          }
          return acc;
        },
        { forkedRepos: [], notForkedRepos: [] },
      );
    return allRepos;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserDetails = async (username: string) => {
  const reposUrl = `${API_URL}/${username}/repos`;
  const perPage = 100;
  console.time("fetchUserDetails");

  try {
    const userData = await fetchUserData(username);
    if (!userData) throw new Error("Failed to fetch user data");

    const totalRepoPages = Math.ceil(userData.publicRepos / perPage);

    const repoRequests = Array.from({ length: totalRepoPages }, (_, i) =>
      fetch(`${reposUrl}?page=${i + 1}&per_page=${perPage}`, {
        cache: "force-cache",
      }),
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
    const forkedRepos = allRepos
      .filter((repo) => repo.fork)
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );
    const notForkedRepos = allRepos
      .filter((repo) => !repo.fork)
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );

    const data = {
      username: userData.login,
      avatarUrl: userData.avatar_url,
      name: userData.name,
      bio: userData.bio,
      followers: userData.followers,
      publicRepos: userData.public_repos,
      totalStars: Number(noOfStars || 0),
      forkedRepos,
      notForkedRepos,
    };

    console.timeEnd("fetchUserDetails");
    return data;
  } catch (error) {
    console.error(error);
    console.timeEnd("fetchUserDetails");
    return null;
  }
};
