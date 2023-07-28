import { View, Text, Pressable, StyleSheet, Image, Animated } from 'react-native';
import { Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as constants from "@data/constants.json";

interface DropdownProps {
	onSelect: (item: DropdownItem) => void,
	horizontal?: boolean,
	selected?: string | number | boolean,
	items: DropdownItem[]
}

interface DropdownItem {
	title: string,
	value: string | number | boolean,
	unavailable?: boolean
}

export default function Dropdown({items, onSelect, horizontal, selected}: DropdownProps) {
	const opacityAnimation = useRef(new Animated.Value(0));
	const scaleAnimation = useRef(new Animated.Value(0));
	const [isOpened, setOpened] = useState(false);
	const [isAnimationFinished, setAnimationFinished] = useState(true);
	const [currentItem, setCurrentItem] = useState(items.find(item => item.value == selected) || {
		title: "Select item",
		value: "null"
	});

	const onPress = useCallback((item: DropdownItem) => {
		setAnimationFinished(false);
		onSelect(item);
		setCurrentItem(item);
		setOpened(false);
	}, [onSelect]);

	useEffect(() => {
		Animated.parallel([
			Animated.timing(opacityAnimation.current, {
				useNativeDriver: true,
				toValue: isOpened ? 1 : 0,
				duration: 150
			}), 
			
			Animated.timing(scaleAnimation.current, {
				useNativeDriver: true,
				toValue: isOpened ? 1 : .9,
				duration: 100
			})
		]).start(() => {
			setAnimationFinished(true);
		});
	}, [isOpened, opacityAnimation]);

	return (
		<>
			<Pressable android_ripple={{color: "#ffffff7b", foreground: true}} onPress={() => {
				setAnimationFinished(false);
				setOpened(true);
			}}>
				<View style={styles.expander}>
					<Text style={styles.expanderLabel}>{currentItem?.title}</Text>
					<Image source={require("@static/icon/expand.png")} style={styles.expanderIcon} />
				</View>
			</Pressable>

			{(isOpened || !isAnimationFinished) && <Animated.View style={[styles.popupHolder, {
				opacity: opacityAnimation.current,
				transform: [ { scale: scaleAnimation.current } ]
			}]}>
				<View style={[styles.popupView, {flexDirection: (horizontal ? "row" : "column")}]}>
					{items.map((item, index, array) => {
						const {title, value, unavailable } = item;

						return (
							<Pressable android_ripple={unavailable ? null : {color: "#ffffff7b"}} key={String(value)} onPress={() => onPress(item)}>
								<View style={[styles.popupItem, {
									paddingLeft: (index == 0) ? 22 : 16,
									paddingRight: (index == array.length - 1) ? 22 : 16
								}]}>
									<Text style={styles.popupItemLabel}>{title || value}</Text>
								</View>
							</Pressable>
						);
					})}
				</View>
			</Animated.View>}
		</>
	)
}

const styles = StyleSheet.create({
	expander: {
		backgroundColor: constants.color.surfacePurple,
		borderRadius: 8,
		paddingRight: 14,
		paddingLeft: 20,
		paddingVertical: 8,
		borderWidth: 1,
		justifyContent: "center",
		alignContent: "center",
		borderColor: "#4e2b4e",
		flexDirection: "row"
	},

	expanderLabel: {
		color: "white", 
		fontWeight: "500",
		textShadowColor: "black",
		textShadowRadius: 5,
		textAlignVertical: "center",
		letterSpacing: .3
	},

	expanderIcon: {
		width: 25,
		height: 25,
		marginLeft: 4,
		resizeMode: "contain"
	},

	popupHolder: {
		position: "absolute", 
		top: 0,
		marginRight: -12
	},

	popupView: {
		backgroundColor: constants.color.surfacePurpleLight,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#000000",
		overflow: "hidden"
	},

	popupItem: {
		paddingVertical: 15
	},

	popupItemLabel: {
		color: "white", 
		fontWeight: "500", 
		fontSize: 15,
		textShadowColor: "black",
		textShadowRadius: 5,
		letterSpacing: .3
	}
});