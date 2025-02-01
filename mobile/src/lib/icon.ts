import {
  BookMinus,
  Clock,
  FolderGit2,
  GitFork,
  Globe,
  Search,
  Star,
  Users,
} from "lucide-react-native";

const icons = {
  search: Search,
  fork: GitFork,
  star: Star,
  follower: Users,
  repo: FolderGit2,
  original: BookMinus,
  globe: Globe,
  clock: Clock,
} as const;

export type IconKey = keyof typeof icons;
export default icons;
