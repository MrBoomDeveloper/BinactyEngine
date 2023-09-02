import { GamemodesCategory } from "@context/gamemodes";
import { Pack } from "@context/packs";
import { SettingsItem } from "@context/settings";
import { requireNativeComponent, NativeModules, NativeModule } from "react-native";

export type NativeVariableType = "string" | "int" | "float" | "boolean";
export type NativeVariableValue = string | number | boolean;

export interface DebugField {
    key: string,
    value: string,
    secret?: boolean
}

interface DebugFieldsMap {
    buildType: string,
    buildDate: string,
	buildVersionName: string,
	buildVersionCode: string,
	applicationId: string,
	deviceBrand: string,
	deviceModel: string,
	deviceOs: string
}

interface AppBridgeModule extends NativeModule {
    exit: () => void,
    restart: () => void,

    getDebug: () => Promise<DebugField[]>,
    getDebugMap: () => Promise<DebugFieldsMap>,

    startMusic: () => void,
    stopMusic: () => void,
    setVolume: (volume: number) => void,

    setKey: <T extends NativeVariableValue>(type: NativeVariableType, name: string, value: T) => Promise<boolean>,
    getKey: <T extends NativeVariableValue>(type: NativeVariableType, name: string, defaultValue: T) => Promise<T>,
    getKeys: (keys: SettingsItem[]) => Promise<SettingsItem[]>

    //TODO: Move to a separate ProfileBridge
    signIn: (method: "google" | "gamejolt" | "guest" | "name" | string) => Promise<boolean>,
    isSignedIn: () => Promise<boolean>,
    getMyData: () => Promise<any>,
    startFirstGame: () => Promise<boolean>
}

interface PackBridgeModule extends NativeModule {
    managePacks: () => void,

    pickPack: (options: {source: "storage" | "official"}) => Promise<Pack>,
    createPack: (props: any) => Promise<boolean>,

    getGamemodes: () => Promise<GamemodesCategory[]>,
    getPacks: () => Promise<Pack[]>
}

type Target = "me" | string;

interface ProfileBridgeModule extends NativeModule {
    signIn: (method: "google" | "gamejolt" | "guest" | "name" | string) => Promise<boolean>,
    logout: () => Promise<boolean>,
    isSignedIn: () => Promise<boolean>,

    getProfile: (props: {
        target: Target,
        detailed?: boolean
    }) => Promise<any>,

    getMissions: (props: {
        target: Target
    }) => Promise<any>
}

interface MultiplayerBridgeModule extends NativeModule {
    joinRoom: (props: {
        id: string,
        password?: string
    }) => Promise<boolean>,

    createRoom: (props: {
        id: string,
        type: "public" | "private",
        password?: string
    }) => Promise<boolean>
}

NativeModules.AppBridge.getDebugMap = async (): Promise<DebugFieldsMap> => {
    const response: DebugField[] = await NativeModules.AppBridge.getDebug();

    function getProperty(key: string) {
        return response.find(item => item.key == key)?.value || "Unknown";
    }

    return {
        buildType: getProperty("buildType"),
        buildDate: getProperty("buildDate"),
		buildVersionName: getProperty("buildVersionName"),
		buildVersionCode: getProperty("buildVersionCode"),
		applicationId: getProperty("applicationId"),
		deviceBrand: getProperty("brand"),
		deviceModel: getProperty("model"),
		deviceOs: getProperty("os")
    }
}

export const {
    AppBridge,
    PackBridge,
    MultiplayerBridge
} = NativeModules as {
    AppBridge: AppBridgeModule,
    PackBridge: PackBridgeModule,
    ProfileBridge: ProfileBridgeModule,
    MultiplayerBridge: MultiplayerBridgeModule
};

export const CustomViews = requireNativeComponent("CharacterView");
export const { GameNative } = NativeModules;
export default GameNative;