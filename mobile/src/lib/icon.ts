import { Search } from "lucide-react-native";

const icons = {
  search: Search,
} as const;

export type IconKey = keyof typeof icons;
export default icons;
