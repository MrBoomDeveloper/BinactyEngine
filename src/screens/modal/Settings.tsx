import { useState, useEffect, memo, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, FlatList, StyleSheet, Animated, Pressable, Dimensions } from "react-native";
import { Header } from "@components";
import { sizes, colors } from "@util/variables";
import Dialog from "./Dialog";
import { update as updateSetting } from "@context/settings";
import { GameNative, AppBridge } from "@native";
import Button from "@components/Button";
import Toggle from "@components/Toggle";
import Input from "@components/Input";
import * as constants from "@data/constants.json";

interface SettingsDrawerProps {
    isOpened: boolean,
    onClose: () => void
}

interface SettingsDrawerMenuProps {
    isOpened: boolean
}

export function SettingsDrawer({isOpened, onClose}: SettingsDrawerProps) {
	const opacityAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacityAnimation, {
            duration: 150,
            toValue: isOpened ? 1 : 0,
            useNativeDriver: true
        }).start();
    }, [opacityAnimation, isOpened]);

	return (
        <Animated.View style={[styles.layout, {opacity: opacityAnimation}]} pointerEvents={isOpened ? "auto" : "none"}>
            <SettingsDrawerMenu isOpened={isOpened} />
            <Pressable onPress={e => onClose()} style={{width: "100%", height: "100%", position: "absolute", right: 300}} />
        </Animated.View>
    );
}

function SettingsDrawerMenu({isOpened}: SettingsDrawerMenuProps) {
    const slideAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(slideAnimation, {
            useNativeDriver: false,
            duration: 150,
            toValue: isOpened ? Dimensions.get("screen").width - 250 : Dimensions.get("screen").width
        }).start();
    }, [isOpened, slideAnimation]);

	const settings = useMemo(() => {
		return [
			{
				title: "Alabama", id: "1",
				data: [
					{
						title: "sgsdgdh", id: "2"
					}
				]
			}
		]
	}, []);

    return (
        <Animated.SectionList sections={settings}
			keyExtractor={item => item.id}
			renderItem={({item}) => {
				return (
					<View>
						<Text>{item.title}</Text>
					</View>
				);
			}}
			style={[styles.menuLayout, {transform: [{translateX: slideAnimation}]}]} />
    );
}



      ////////////////
      ///DEPRECATED///    |  |  |  |  |
      ////////////////   \/ \/ \/ \/ \/

function Settings({visible, onClose}) {
	const settings = useSelector(state => state.settings.value);
	const dispatch = useDispatch();
	
	const renderItem = ({item, index}) => {
		return <Setting item={item} onUpdate={(newValue) => {
			dispatch(updateSetting({index, newValue}));
		}} />
	}
	
	return (
		<Dialog visible={visible} onClose={onClose}>
			<Header title="Settings" onClose={onClose} />
			<FlatList data={settings}
			  ListHeaderComponent={<View style={{marginTop: 10}} />}
			  ListFooterComponent={<View style={{marginBottom: 50}} />}
			  style={{width: "100%"}}
			  renderItem={renderItem} />
		</Dialog>
	);
}

function Setting({item, onUpdate}) {
	return (
		<View style={styles.setting}>
			<View style={styles.infoWrapper}>
				<View style={styles.info}>
					<Text style={styles.title}>{item.title}</Text>
					{item.description && <Text style={styles.description}>{item.description}</Text>}
				</View>
			</View>
			<Controller {...item} onUpdate={onUpdate} defaultValue={item.initial} />
		</View>
	);
}

function Controller({id, type, max, defaultValue, onUpdate}) {
	const [error, setError] = useState("");
	
	const onToggle = (newValue: boolean) => {
		onUpdate(newValue);
		GameNative.setKey("boolean", id, String(newValue));
	}
	
	const onChangeText = (newText: string) => {
		if(newText.length > 10) {
			setError("Too many characters!");
			return;
		}
		
		if(type == "number" && max != null && newText > max) {
			setError("The value is too big!");
			return;
		}
		
		if(newText != "" && /^\d+$/.test(newText.toString())) {
			setError("");
			onUpdate(newText);
			if(type == "number" && id == "musicVolume") {
				AppBridge.setVolume(parseFloat(newText));
			}
			GameNative.setKey("int", id, newText);
		} else {
			setError("Invalid value!");
		}
	}
	
	
	switch(type) {
		case "boolean": return (
			<Toggle onToggle={onToggle}
				defaultValue={defaultValue}
				style={{ marginRight: 8 }}/>
		);

		case "number": return (
			<Input error={error}
				onChangeText={onChangeText}
				defaultValue={defaultValue}
				type="number"
				style={styles.input} />
		);

		default: return (
			<View>
				<Text>Unknown setting type: {type}</Text>
			</View>
		);
	}
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
        width: 250,
        height: "100%",
        backgroundColor: constants.color.purpleBackground
    },






	setting: {
		alignItems: "center",
		paddingRight: 15,
		flexDirection: "row",
		margin: 25,
		marginTop: 10,
		marginBottom: 0,
		gap: 25,
		flexGrow: 1,
		backgroundColor: colors.surfaceLight
	},
	
	info: {
		padding: 15,
		maxWidth: "75%",
		gap: 8
	},
	
	infoWrapper: {
		flexGrow: 1
	},
	
	title: {
		fontSize: 15,
		color: "white"
	},
	
	description: {
		fontSize: 13,
		lineHeight: 22
	},
	
	input: {
		marginTop: 10,
		marginBottom: 10
	}
});

export default memo(Settings);