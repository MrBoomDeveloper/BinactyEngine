import { ImageSourcePropType } from "react-native";

interface Icon {
    outlineBlack?: number,
    outlineWhite?: number,
    filledBlack?: number,
    filledWhite?: number
}

export const icons: {[key: string]: Icon} = {
    groups: {
        outlineBlack: require("@static/icon/groups_black.png")
    }
}

const avatars: {[key: string]: number} = {
    klarrie: require("@static/avatar/premium.jpg")
}

export function getAvatar(name: string): ImageSourcePropType {
    if(name in avatars) return avatars[name];
    if(name.includes("/")) {
        return { uri: name };
    }
    return avatars["klarrie"];
}