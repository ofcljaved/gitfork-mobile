import { TextInput, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

export default function SearchBar({
    onSubmit,
}: {
    onSubmit: (value: string) => void;
}) {
    const [text, setText] = useState("");

    const handleSubmit = () => {
        onSubmit(text);
        setText("");
    }
    return (
        <View className="flex flex-row items-center gap-2 border-hairline pl-2 rounded-lg">
            <View className="w-6 h-6">
                <AntDesign name="search1" size={20} color="gray" />
            </View>
            <TextInput
                inputMode="search"
                returnKeyType="search"
                autoCapitalize="none"
                value={text}
                onChangeText={setText}
                onSubmitEditing={() => handleSubmit()}
                className="flex-1 placeholder:font-medium text-lg"
                placeholder="Enter your Github username"
            />
        </View>
    )
}
