import { useMemo } from "react";
import { StatusBar, StyleSheet, View, Image, Text, ImageSourcePropType } from "react-native";
import Button from "@components/Button";
import { sizes, colors } from "@util/variables.json";

const avatars: Record<string, number> = {
	klarrie: require("../static/avatar/premium.jpg")
}

interface ValueElement {
	title: string,
	count: number,
	icon: ImageSourcePropType
}

interface PlayerElement {
	avatar: string,
	nick: string,
	level: number
}

interface HeaderElement {
	actions: {
		key: string,
		icon: ImageSourcePropType
		onPress: () => void
	}[],
	values?: ValueElement[],
	children?: JSX.Element,
	player?: PlayerElement,
	onClose?: () => void,
	title?: string
}

export default function Header({ title, values, actions, onClose, player, children}: HeaderElement) {
	return (
		<View style={styles.header}>
			{onClose && <Button
				style={styles.back}
				icon={require("@static/icon/back.png")}
				theme="popup"
				onPress={onClose} />}
				
			{title && <Text style={styles.title}>{title}</Text>}
			{player && Profile(player)}
			<View style={{flex: 1}}>{children}</View>
			{values && <View style={styles.values}>{values.map(item => <Value {...item}/>)}</View>}
			
			<View style={styles.actions}>
				{actions && actions.map(({key, onPress, icon}) => (
					<Button key={key}
						onPress={onPress}
						theme="popup"
						icon={icon} />
				))}
			</View>
		</View>
	);
}

function Profile({nick, level, avatar}: PlayerElement) {
	const avatarIcon = useMemo(() => {
		if(avatar.includes("/")) {
			return { uri: avatar };
		} else {
			return avatars[avatar];
		}
	}, [avatar]);
	
	return (
		<View style={styles.profile}>
			<Image style={styles.avatar} source={avatarIcon}/>
			<View style={styles.stats}>
				<Text style={styles.nicknameLabel}>{nick}</Text>
				<View>
					<Text style={styles.levelLabel}>Lvl.{level}</Text>
				</View>
			</View>
		</View>
	);
}

function Value({count, icon}: ValueElement) {
	return (
		<View style={styles.value}>
			<View style={styles.valueBackground} />
			<Image style={{width: 25, height: 25}} source={icon} />
			<Text style={{color: "white", fontSize: 16}}>{count}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		display: "flex",
		flexDirection: "row",
		padding: sizes.medium,
		backgroundColor: colors.surfaceLight,
		height: 60,
		alignItems: "center"
	},
	
	back: {
		marginLeft: 15,
		marginRight: 5
	},
	
	title: {
		color: "white",
		fontSize: 15,
		fontWeight: "500",
		marginLeft: 10
	},
	
	avatar: {
		width: 38,
		height: 38,
		borderRadius: 2,
		marginLeft: StatusBar.currentHeight
	},
	
	stats: {
		height: "100%",
		marginLeft: 14,
		padding: 1,
		display: "flex",
		justifyContent: "center"
	},
	
	profile: {
		display: "flex",
		flexDirection: "row"
	},
	
	nicknameLabel: {
		color: "white",
		fontSize: 15,
		marginBottom: 5
	},
	
	levelLabel: {
		color: colors.textSecond,
		fontSize: 13,
		fontWeight: "500"
	},
	
	values: {
		flexDirection: "row",
		gap: 50
	},
	
	value: {
		flexDirection: "row",
		alignItems: "center",
		minWidth: 100,
		gap: 10
	},
	
	valueBackground: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
		backgroundColor: "rgba(75, 75, 75, 0.1)",
		borderWidth: 1,
		borderColor: "rgba(200, 200, 200, .1)",
		position: "absolute"
	},
	
	actions: {
		marginLeft: 50,
		paddingRight: 20,
		alignItems: "flex-end"
	}
});