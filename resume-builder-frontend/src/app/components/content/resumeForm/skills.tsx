import useTags from "@/app/hooks/useTags";
import { ChangeEvent, useState } from "react";
import "./skills.css";

interface Tag {
    tags: string[];
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    maxTags: number;
}

export default function Skills({maxTags}: {maxTags: number}) {
    const [focused, setFocused] = useState(false);
    const [tagText, setTagText] = useState('');
    const {tags, handleAddTag, handleRemoveTag} = useTags(maxTags);
    
    const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Should it also trigger on Space?
        if(event.key === "Enter"){
            event.preventDefault();

            if (tags.length >= maxTags) {
                //TODO: Error Notification
            }
            if (tagText.trim() !== "" && tagText.length <= 16) {
                handleAddTag(tagText);
                setTagText('');
            }
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTagText(event.target.value);
    }

    return (
        <div className="w-8/12">
            <input className="w-full p-4 pb-2 placeholder-text border-1 border-b-2 border-accent border-b-secondary rounded-t-lg outline-none focus:border-primary" 
                name="tagInput" type="text" placeholder="Add Skills here..." value={tagText} 
                onKeyDown={handleKeypress} 
                onChange={handleInputChange} 
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            <div className={`w-full ${focused ? 'border-1 rounded-b-lg border-primary' : 'border-1 rounded-b-lg border-background'}`}>
                {tags.length > 0 ? <h3 className="w-full">Skills:</h3> : ''}
                <div className="flex">
                    {tags.map((tag: string, idx: number) => (
                        <div id="tag" key={`${tag}-${idx}`} onClick={() => handleRemoveTag(tag)}>
                            {tag}
                            <span>&#10683;</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
