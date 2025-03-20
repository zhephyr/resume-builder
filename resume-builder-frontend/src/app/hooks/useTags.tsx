import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function useTags(maxTags: number) {
    const {setValue, control} = useFormContext();
    const [tags, setTags] = useState<string[]>([]);

    const handleAddTag = (tag: string) => {
        if (tag && !tags.includes(tag) && tags.length < maxTags) {
            setTags([tag, ...tags]);
            setValue("skills", tags)
        }
    };

    const handleRemoveTag = (toRemove: string) => {
        setTags(tags.filter((tag) => tag !== toRemove));
        setValue("skills", tags)
    }

    return {tags, handleAddTag, handleRemoveTag};
}