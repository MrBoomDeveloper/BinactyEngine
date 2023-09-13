import { memo, useEffect, useRef, useState } from "react";
import { Animated, BackHandler, Dimensions, Pressable, StyleSheet, ViewStyle } from "react-native";
import * as constants from "@data/constants.json";
import { useTheme } from "@util/hooks";

export interface SimpleDrawerProps {
    isOpened: boolean,
    onClose: () => void
}

interface DrawerProps extends SimpleDrawerProps {
    width: number,
    direction: "left" | "right",
    children: JSX.Element | JSX.Element[],
    style?: ViewStyle | ViewStyle[]
}

function Drawer({isOpened, onClose, width, direction, children, style}: DrawerProps) {
    const [theme] = useTheme();
    const [isAnimationFinished, setIsAnimationFinished] = useState(false);
    const opacityAnimation = useRef(new Animated.Value(0)).current;
    const slideAnimation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
        setIsAnimationFinished(false);
		const handler = BackHandler.addEventListener("hardwareBackPress", () => {
			if(isOpened) onClose();
			return isOpened;
		});

		return () => handler.remove();
	}, [isOpened]);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityAnimation, {
                duration: 150,
                toValue: isOpened ? 1 : 0,
                useNativeDriver: true
            }),
    
            Animated.timing(slideAnimation, {
                useNativeDriver: false,
                duration: 150,
                toValue: direction == "left"
                    ? isOpened ? 0 : -width
                    : isOpened ? Dimensions.get("screen").width - width : Dimensions.get("screen").width
            })
        ]).start(() => setIsAnimationFinished(true));
    }, [opacityAnimation, slideAnimation, isOpened]);

    const backgroundStyle: ViewStyle = {width: "100%", height: "100%", position: "absolute"};
    direction == "left"
        ? backgroundStyle.left = width
        : backgroundStyle.right = width;
    
    if(isAnimationFinished && !isOpened) return null;

	return (
        <Animated.View style={[styles.layout, {opacity: opacityAnimation}]} pointerEvents={isOpened ? "auto" : "none"}>
            <Animated.View style={[styles.menuLayout, {
                width,
                backgroundColor: theme.colors.screenBackground,
                transform: [{translateX: slideAnimation}]
            }, style]}>
                {children}
            </Animated.View>
            <Pressable style={backgroundStyle} onPressIn={e => {
                setIsAnimationFinished(false);
                onClose();
            }} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    layout: {
        backgroundColor: "rgba(0, 0, 0, .75)",
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 999
    },

	menuLayout: {
        height: "100%",
        backgroundColor: constants.color.purpleBackground
    },
});

export default memo(Drawer);