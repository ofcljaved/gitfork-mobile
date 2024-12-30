import { CiSearch } from "react-icons/ci";
import { LuBook, LuGitFork, LuStar, LuUsers } from "react-icons/lu";

const icons = {
    book:LuBook,
    users:LuUsers,
    gitFork:LuGitFork,
    star:LuStar,
    search: CiSearch,
};

export type IconKey = keyof typeof icons;
export default icons;
