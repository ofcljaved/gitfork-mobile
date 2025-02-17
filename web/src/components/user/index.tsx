import { Suspense } from "react"
import { SmallUserCard } from "./small-card"
import { UserCard } from "./user-card"

export const User = async ({ query, small }: { query: string, small?: boolean }) => {
    if (small) {
        return (
            <Suspense fallback={<div>Loading Small User...</div>}>
                <SmallUserCard query={query} />
            </Suspense>
        )
    }

    return (
        <Suspense fallback={<div>Loading User...</div>}>
            <UserCard query={query} />
        </Suspense>
    )
}
