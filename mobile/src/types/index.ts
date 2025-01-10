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
