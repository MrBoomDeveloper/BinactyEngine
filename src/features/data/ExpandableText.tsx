import { memo, useState } from "react";
import { Text, TextStyle, TouchableOpacity } from "react-native";

function ExpandableText({text, style, minLines = 2}: {
    text: string,
	minLines?: number,
    style?: TextStyle | TextStyle[]
}) {
    const [isExpanded, setExpanded] = useState(false);

    return (
        <TouchableOpacity onPress={() => setExpanded(!isExpanded)}>
            <Text style={style} numberOfLines={isExpanded ? undefined : minLines}>{text}</Text>
        </TouchableOpacity>
    );
}

export default memo(ExpandableText);