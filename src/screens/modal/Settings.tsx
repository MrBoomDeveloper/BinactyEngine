import { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Button, Toggle, Input, Header } from "@components";
import { sizes, colors } from "@util/variables";
import Dialog from "./Dialog";
import { update as updateSetting } from "@context/settings";
import { GameNative, AppBridge } from "@native";

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
			  renderItem={renderItem} />
		</Dialog>
	);
}

function Setting({item, onUpdate}) {
	return (
		<View style={styles.setting}>
			<View style={styles.info}>
				<Text style={styles.title}>{item.title}</Text>
				{item.description && <Text style={styles.description}>{item.description}</Text>}
			</View>
			<Controller {...item} onUpdate={onUpdate} defaultValue={item.initial} />
		</View>
	);
}

function Controller({id, type, max, defaultValue, onUpdate}) {
	const [error, setError] = useState("");
	
	const onToggle = (newValue) => {
		onUpdate(newValue);
		GameNative.setKey("boolean", id, String(newValue));
	}
	
	const onChangeText = (newText) => {
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
			GameNative.setKey("int", id, newText);
			if(id == "musicVolume") AppBridge.setVolume(Number(newText));
		} else {
			setError("Invalid value!");
		}
	}
	
	
	switch(type) {
		case "boolean":
			return (
				<Toggle onToggle={onToggle}
					defaultValue={defaultValue}
					style={{ marginRight: 8 }}/>
			);
		case "number":
			return (
				<Input error={error}
					onChangeText={onChangeText}
					defaultValue={defaultValue}
					type="number"
					style={styles.input} />
			);
	}
}

const styles = StyleSheet.create({
	setting: {
		display: "flex",
		alignItems: "center",
		paddingRight: 15,
		flexDirection: "row",
		margin: 25,
		marginTop: 10,
		marginBottom: 0,
		gap: 25,
		backgroundColor: colors.surfaceLight
	},
	
	info: {
		padding: 15,
		display: "flex",
		flexGrow: 1,
		gap: 8
	},
	
	title: {
		fontSize: 15,
		color: "white"
	},
	
	description: {
		fontSize: 13
	},
	
	input: {
		marginTop: 10,
		marginBottom: 10
	}
});

export default memo(Settings);