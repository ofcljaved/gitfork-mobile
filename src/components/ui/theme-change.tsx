'use client'

import { useTheme } from "next-themes";
import Icon from "../icon";
export function ThemeChange() {
    const { theme, setTheme } = useTheme();
    return (
        <div
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="border p-2 hover:bg-muted rounded-md border-muted/70 cursor-pointer"
        >
            <Icon
                icon={theme === "dark" ? "sun" : "moon"}
                size={20}
                className="text-secondary-foreground"
            />
        </div>
    );
}
