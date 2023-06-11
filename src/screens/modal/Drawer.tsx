import { useEffect, useRef } from "react";
import { Animated, BackHandler, Dimensions, Pressable, StyleSheet, ViewStyle } from "react-native"
import * as constants from "@data/constants.json";

export interface SimpleDrawerProps {
    isOpened: boolean,
    onClose: () => void
}

interface DrawerProps extends SimpleDrawerProps {
    width: number,
    direction: "left" | "right",
    children: JSX.Element | JSX.Element[]
}

export default function Drawer({isOpened, onClose, width, direction, children}: DrawerProps) {
    const opacityAnimation = useRef(new Animated.Value(0)).current;
    const slideAnimation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
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
        ]).start();
    }, [opacityAnimation, slideAnimation, isOpened]);

    const backgroundStyle: ViewStyle = {width: "100%", height: "100%", position: "absolute"};
    direction == "left"
        ? backgroundStyle.left = width
        : backgroundStyle.right = width;

	return (
        <Animated.View style={[styles.layout, {opacity: opacityAnimation}]} pointerEvents={isOpened ? "auto" : "none"}>
            <Animated.View style={[styles.menuLayout, {width, transform: [{translateX: slideAnimation}]}]}>
                {children}
            </Animated.View>
            <Pressable onPressIn={e => onClose()} style={backgroundStyle} />
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