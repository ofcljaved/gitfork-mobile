'use client'

import { useTheme } from "next-themes";
import Icon from "../icon";
export function ThemeChange() {
    const { theme, setTheme } = useTheme();
    return (
        <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex items-center justify-center border p-2 hover:bg-muted rounded-md border-muted/70 cursor-pointer"
        >
            <Icon
                icon={"sun"}
                size={20}
                className="text-secondary-foreground rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <Icon
                icon={"moon"}
                size={20}
                className="text-secondary-foreground absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
        </button>
    );
}
