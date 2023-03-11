import { Children, useState, useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

export default function Pager({children, select}) {
	const animation = useRef(new Animated.Value(0));
	useEffect(() => {
		Animated.timing(animation.current, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true
		}).start();
	}, [animation.current]);
	
	useEffect(() => {
		animation.current = new Animated.Value(0);
	}, [select]);
	
	const childs = Children.toArray(children);
	return (
		<View style={styles.wrapper}>
			<Animated.View style={{...styles.pager, opacity: animation.current}}>
				{children.map(child => {
					if(select == child.props.id) {
						return child;
					}
				})}
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flexGrow: 1
	},
	
	pager: {
		flexGrow: 1
	}
});