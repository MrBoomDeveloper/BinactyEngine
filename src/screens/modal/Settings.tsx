import { View, Text, StyleSheet, SectionList } from "react-native";
import { SettingsCategory, SettingsItem, update as updateSetting } from "@context/settings";
import { AppBridge } from "@native";
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
						placeholder=""
						onChangeText={newValue => {
							if(newValue == "" || isNaN(newValue as unknown as number)) return;

							const value = parseFloat(newValue);
							if(id == "musicVolume") AppBridge.setVolume(value);
							
							dispatch(updateSetting({id, newValue: value, type}));
						}} />
				)}
			</View>
		</View>
	)
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
		flexDirection: "row",
		borderWidth: 1,
        borderColor: "#221824"
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
	}
});