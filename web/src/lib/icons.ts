import { BsSun } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { LuBook, LuGitFork, LuGlobe, LuStar, LuUsers } from "react-icons/lu";
import { PiMoon } from "react-icons/pi";

const icons = {
    book:LuBook,
    users:LuUsers,
    gitFork:LuGitFork,
    star:LuStar,
    search: CiSearch,
    globe:LuGlobe,
    clock: GoClock,
    sun: BsSun,
    moon: PiMoon,
};

export type IconKey = keyof typeof icons;
export default icons;
