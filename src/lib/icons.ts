import { LuBook, LuGitFork, LuStar, LuUsers } from "react-icons/lu";

const icons = {
    book:LuBook,
    users:LuUsers,
    gitFork:LuGitFork,
    star:LuStar,
};

export type IconKey = keyof typeof icons;
export default icons;
