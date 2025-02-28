import { View } from "react-native";
import { useState } from "react";
import { Tabs } from "./tab";
import { RepoCard } from "./repo-card";
import { TABS } from "@/constants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchStore } from "@/store/search";
import { fetchRepos } from "@/actions/fetchRepos";
import { FlashList } from "@shopify/flash-list";

export const RepoList = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const { search } = useSearchStore();
    const { data: repos } = useSuspenseQuery({
        queryKey: ["repos", search],
        queryFn: () => fetchRepos(search),
    });

    if (!repos) return null;

    return (
        <View className="flex-1" >
            <Tabs activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab)} />
            {TABS[activeTab] === "Original" &&
                <FlashList
                    data={repos.notForkedRepos}
                    renderItem={({ item }) => <RepoCard repo={item} />}
                    keyExtractor={(item) => item.html_url}
                    contentContainerClassName="gap-4"
                    className="my-4"
                    estimatedItemSize={140}
                />
            }
            {TABS[activeTab] === "Fork" &&
                <FlashList
                    data={repos.forkedRepos}
                    renderItem={({ item }) => <RepoCard repo={item} />}
                    keyExtractor={(item) => item.html_url}
                    contentContainerClassName="gap-4"
                    className="my-4"
                    estimatedItemSize={140}
                />
            }
        </View>
    );
};
