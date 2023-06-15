import { requireNativeComponent, NativeModules, NativeModule } from "react-native";

export interface DebugField {
    key: string,
    value: string,
    secret?: boolean
}

interface AppBridgeModule extends NativeModule {
    exit: () => void,
    restart: () => void,

    getDebug: () => Promise<DebugField[]>,

    startMusic: () => void,
    stopMusic: () => void,
    setVolume: (volume: number) => void,

    //TODO: Move to a separate ProfileBridge
    signIn: (method: "google" | "gamejolt" | "guest" | "name" | string) => Promise<boolean>,
    isSignedIn: () => Promise<boolean>,
    getMyData: () => Promise<any>
}

interface PackBridgeModule extends NativeModule {
    managePacks: () => void,
    getPacks: () => Promise<any>,
    createPack: (props: any) => Promise<boolean>
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