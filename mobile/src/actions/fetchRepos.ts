import { UserRepos } from "@/types";

export async function fetchRepos(username: string): Promise<UserRepos | null> {
  try {
    const response = await fetch(
      //`https://gitfrk.vercel.app/api/v1/user/repos?name=${username}`,
      `http://192.168.1.106:3000/api/v1/user/repo?name=${username}`,
    );
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
