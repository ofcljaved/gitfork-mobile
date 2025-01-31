import { FolderGit2, GitFork, Search, Star, Users } from "lucide-react-native";

const icons = {
  search: Search,
  fork: GitFork,
  star: Star,
  follower: Users,
  repo: FolderGit2
} as const;

export type IconKey = keyof typeof icons;
export default icons;
