import { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, FlatList, StyleSheet, SectionList } from "react-native";
import Header from "@components/Header";
import { colors } from "@util/variables.json";
import Dialog from "./Dialog";
import { SettingsCategory, SettingsItem, update as updateSetting } from "@context/settings";
import { GameNative, AppBridge } from "@native";
import Toggle from "@components/Toggle";
import Input from "@components/Input";
import * as constants from "@data/constants.json";
import { useAppDispatch, useAppSelector } from "@util/hooks";
import Drawer, { SimpleDrawerProps } from "./Drawer";

export function SettingsDrawer(props: SimpleDrawerProps) {
	const settings: SettingsCategory[] = useAppSelector(state => state.settings.list);

	return (
		<Drawer width={350} direction="right" {...props}>
			<SectionList sections={settings}
				keyExtractor={item => item.id}
				ListFooterComponent={<View style={{height: 25}} />}
				renderSectionHeader={({section}) => <SettingsCategoryHeader {...section} />}
				renderItem={({item}) => <Setting {...item} />} />
		</Drawer>
	);
}

function SettingsCategoryHeader({title}: SettingsCategory) {
	return (
		<View style={styles.categoryHeaderLayout}>
			<Text style={styles.categoryHeaderTitle}>{title}</Text>
		</View>
	)
}

function Setting({title, description, type, restart, value, id}: SettingsItem) {
	const dispatch = useAppDispatch();

	return (
		<View style={styles.settingLayout}>
			<View style={styles.settingInfo}>
				<Text style={styles.settingTitle}>{title}</Text>
				{description && <Text style={styles.settingDescription}>{description}</Text>}
			</View>

			<View style={styles.settinAction}>
				{type == "boolean" && (
					<Toggle defaultValue={value as boolean}
						onToggle={newValue => {
							dispatch(updateSetting({id, newValue, type}));
							if(restart) AppBridge.restart();
						}} />
				)}

				{type == "string" && (
					<Input defaultValue={value as string}
						type="string"
						style={{width: 100}}
						onChangeText={newValue => {
							dispatch(updateSetting({id, newValue, type}));
						}} />
				)}

				{(type == "int" || type == "float") && (
					<Input defaultValue={value as number}
						type={type}
						style={{width: 75}}
						maxLength={4}
						onChangeText={newValue => {
							const response: number = (newValue == "" || isNaN(newValue as unknown as number))
								? 0 : parseFloat(newValue);
							
							if(id == "musicVolume") {
								AppBridge.setVolume(response);
							}

							dispatch(updateSetting({id, newValue: response, type}));
						}} />
				)}
			</View>
		</View>
	)
}



      ////////////////
      ///DEPRECATED///    |  |  |  |  |
      ////////////////   \/ \/ \/ \/ \/

function Settings({visible, onClose}) {
	const settings = useSelector(state => state.settings.old);
	const dispatch = useDispatch();
	
	const renderItem = ({item, index}) => {
		return <SettingOld item={item} onUpdate={(newValue) => {
			dispatch(updateSetting({index, newValue, type: item.type, id: item.id}));
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

function SettingOld({item, onUpdate}) {
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
	categoryHeaderLayout: {
		padding: 15,
		paddingHorizontal: 20,
		backgroundColor: "rgba(0, 0, 0, .2)",
		marginBottom: 5
	},

	categoryHeaderTitle: {
		color: "white",
		fontSize: 20,
		fontWeight: "500"
	},

	settingLayout: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: constants.color.surfaceLight,
		marginLeft: 12,
		marginRight: constants.size.inlineScreenPadding,
		marginBottom: 8,
		borderRadius: 8,
		flexDirection: "row"
	},

	settingInfo: {
		maxWidth: 150
	},

	settingTitle: {
		color: "white",
		fontSize: 16,
		lineHeight: 24
	},

	settingDescription: {
		marginTop: 4,
		lineHeight: 24
	},

	settinAction: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "flex-end"
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