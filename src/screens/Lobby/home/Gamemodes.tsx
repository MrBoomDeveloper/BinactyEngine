import { useDispatch, useSelector } from "react-redux";
import { Text, View, FlatList, Animated, StyleSheet, TouchableOpacity, Image, SectionList } from "react-native";
import { colors } from "@util/variables";
import { setActive } from "@context/gamemodes";

export default function Gamemodes({swipeAnimation, setGamemodesVisbility, setEditorVisibility, handleTouch, handleSwipe}) {
	const allGamemodes = useSelector(state => state.gamemodes.list);
	
	return (
		<Animated.View style={{bottom: swipeAnimation.interpolate({inputRange: [0, 1], outputRange: ["-100%", "0%"]}), position: "absolute", backgroundColor: colors.background, height: "100%", width: "100%"}}>
			<View style={styles.swipeHandler} onMoveShouldSetResponder={handleTouch} onResponderMove={e => handleSwipe(e, true)}/>
			<TouchableOpacity onPress={() => setGamemodesVisbility(false)} style={styles.showMoreGamemodes} onPressIn={handleTouch} onPressOut={e => handleSwipe(e, true)}>
				<Image source={require("@static/icon/expand.png")} style={{...styles.moreGamemodesIcon, transform: [{scaleY: -1}]}}/>
				<Text style={{color: "white"}}>Go back to overview</Text>
			</TouchableOpacity>
			
			<SectionList sections={allGamemodes}
				keyExtractor={item => item.id}
				onScrollBeginDrag={handleTouch}
				onScrollEndDrag={e => handleSwipe(e, true)}
				renderItem={() => null}
				renderSectionHeader={item => (
					<GamemodeCategory data={item.section} 
						handleTouch={handleTouch}
						setGamemodesVisbility={setGamemodesVisbility}
						handleSwipe={handleSwipe} />
				)}/>
		</Animated.View>
	);
}

function GamemodeCategory({data: {title, data}, handleTouch, handleSwipe, setGamemodesVisbility}) {
	const dispatch = useDispatch();
	
	return (
		<>
			<Text style={gmStyles.catTitle}>{title}</Text>
			<View style={{...styles.swipeHandler}} onMoveShouldSetResponder={handleTouch} onResponderMove={e => handleSwipe(e, true)}/>
			<FlatList data={data}
				keyExtractor={item => item.id}
				horizontal={true}
				onScrollBeginDrag={handleTouch}
				onScrollEndDrag={e => handleSwipe(e, true)}
				showsHorizontalScrollIndicator={false}
				ListHeaderComponent={<View style={{width: 25}} />}
				ListFooterComponent={<View style={{width: 25}} />}
				ItemSeparatorComponent={<View style={{width: 15}} />}
				renderItem={({item}) => {
					function onPress() {
						dispatch(setActive(item));
						setGamemodesVisbility(false);
					}
					
					return (
						<TouchableOpacity style={gmStyles.card} onPress={onPress}>
							<Image style={gmStyles.banner} source={require("@static/banner/gamemode/banner_hd.jpg")} />
							<Image style={gmStyles.shadowLeft} source={require("@static/ui/gradientShadowLeftRight.png")} />
							<Image style={gmStyles.shadowBottom} source={require("@static/ui/gradientShadowBottomTop.png")} />
							<Text style={{color: "white", fontWeight: "500", fontSize: 18, width: "30%", flexGrow: 1, margin: 15, lineHeight: 26}}>{item.name}</Text>
							<Text style={{color: "white", textShadowColor: "black", textShadowRadius: 3, fontSize: 15, width: "30%", margin: 15, lineHeight: 20}}>Made by:  {item.author}</Text>
						</TouchableOpacity>
					);
				}}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	toggleGamemodesVisibilityGradient: {
		position: "absolute",
		height: "50%",
		width: "100%",
		opacity: 0.8,
		bottom: 0
	},
	
	showMoreGamemodes: {
		width: "100%",
		padding: 25,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		paddingLeft: 0
	},
	
	moreGamemodesIcon: {
		width: 35,
		height: 35,
		marginRight: 5
	},
	
	swipeHandler: {
		width: "100%",
		height: "100%",
		position: "absolute"
	}
});

const gmStyles = StyleSheet.create({
	catTitle: {
		color: "white",
		fontWeight: "500",
		fontSize: 22,
		margin: 25
	},
	
	card: {
		width: 300,
		height: 150
	},
	
	banner: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		position: "absolute",
		borderRadius: 10,
		overflow: "hidden"
	},
	
	shadowLeft: {
		opacity: 0.7,
		width: "50%",
		height: "100%",
		position: "absolute",
		borderRadius: 10,
		resizeMode: "stretch",
		overflow: "hidden"
	},
	
	shadowBottom: {
		width: "60%",
		position: "absolute",
		borderRadius: 10,
		resizeMode: "stretch",
		overflow: "hidden"
	}
});