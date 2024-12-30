import { CiSearch } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { LuBook, LuGitFork, LuGlobe, LuStar, LuUsers } from "react-icons/lu";

const icons = {
    book:LuBook,
    users:LuUsers,
    gitFork:LuGitFork,
    star:LuStar,
    search: CiSearch,
    globe:LuGlobe,
    clock: GoClock,
};

export type IconKey = keyof typeof icons;
export default icons;
