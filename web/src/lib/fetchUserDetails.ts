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

export interface UserRepos {
  forkedRepos: Repo[];
  notForkedRepos: Repo[];
}

export interface UserDetails extends UserData, UserStars, UserRepos {}

export const fetchUserData = async (username: string): Promise<UserData> => {
  const userUrl = `${API_URL}/${username}`;
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
};

export const fetchUserStarCount = async (
  username: string,
): Promise<UserStars> => {
  const starsUrl = `${API_URL}/${username}/starred?page=1&per_page=1`;
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
};

export const fetchUserRepos = async (username: string): Promise<UserRepos> => {
  const reposUrl = `${API_URL}/${username}/repos`;
  const perPage = 100;

  const userData = await fetchUserData(username);
  if (!userData) throw new Error("Failed to fetch user data");
  const totalRepoPages = Math.ceil(userData.publicRepos / perPage);

  const repoRequests = Array.from({ length: totalRepoPages }, async (_, i) => {
    const res = await fetch(
      `${reposUrl}?page=${i + 1}&per_page=${perPage}&sort=updated`,
      {
        cache: "force-cache",
      },
    );
    return await res.json();
  });

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
};

export const fetchUserDetails = async (
  username: string,
): Promise<UserDetails> => {
  const initialData = {
    username: "",
    avatarUrl: "",
    name: "",
    bio: "",
    followers: 0,
    publicRepos: 0,
    totalStars: 0,
    forkedRepos: [],
    notForkedRepos: [],
  };
  try {
    const [userData, userStars, userRepos] = await Promise.all([
      fetchUserData(username),
      fetchUserStarCount(username),
      fetchUserRepos(username),
    ]);
    if (!userData || !userStars || !userRepos)
      throw new Error("Failed to fetch user data");

    return {
      ...userData,
      ...userStars,
      ...userRepos,
    };
  } catch (error) {
    console.error("Error fetching user details", { cause: error });
    return initialData;
  }
};
