import { Dimensions, ScrollView, SectionList, StyleSheet, Text, View } from "react-native";
import * as constants from "@data/constants.json";
import { GamemodesItem } from "@context/gamemodes";
import { StatsBar } from "features/data/Stats";
import { formatPlayersCount } from "@util/format";
import Button from "@components/Button";

export default function Multiplayer({gamemode}: {
	gamemode: GamemodesItem
}) {
	return (
		<View style={styles.layout}>
			<View style={{paddingHorizontal: constants.size.inlineScreenPadding, flexDirection: "row", gap: 25}}>
				<View>
					<Params gamemode={gamemode} />
				</View>

				<View style={{flex: 1, position: "relative", height: Dimensions.get("screen").height}}>
					<View style={{flexDirection: "row", position: "absolute", bottom: 0, left: 0, paddingBottom: 20, gap: 8}}>
						<Button theme="brand" text="I'm Ready!" 
							style={{paddingHorizontal: 25}}
							onPress={() => {}} />

						<Button theme="brand" text="Leave room" 
							style={{paddingHorizontal: 25}}
							onPress={() => {}} />
					</View>
				</View>
			</View>
		</View>
	);
}

const dummySettings = [
	{
		data: [
			{
				title: "Network type",
				input: "enum",
				options: [
					{ title: "LAN", id: "lan" },
					{ title: "Server", id: "server" }
				]
			}, {
				title: "Password when joining",
				input: "string",
				togglable: true,
				secret: true
			}, {
				title: "Max players",
				input: "number"
			}
		]
	}
];

function Params({gamemode}: {gamemode: GamemodesItem}) {
	const { name, description, time, maxPlayers } = gamemode;

	return (
		<SectionList sections={dummySettings} contentContainerStyle={{paddingVertical: 75, width: 220}}

			ListEmptyComponent={<Text>No settings were found</Text>}

			renderItem={({item}) => {
				return (
					<View>
						<Text>{item.title}</Text>
					</View>
				)
			}}

			ListHeaderComponent={(
				<View>
					<Text style={styles.title}>{name}</Text>

					<StatsBar style={{marginTop: 6, marginBottom: 8}} items={[
               		 	...(time != null ? [{ title: `Duration  ${time}`, icon: require("@static/icon/time.png") }] : []),
                		...[{ title: formatPlayersCount(maxPlayers), icon: require("@static/icon/groups.png") }]
            		]} />

					<Text style={styles.description}>{description}</Text>

					<View style={{backgroundColor: "#ffffff", width: "100%", height: 1, marginVertical: 14, opacity: .5}} />
				</View>
			)} />
	);
}

const styles = StyleSheet.create({
	layout: {
		width: Dimensions.get("screen").width,
		height: Dimensions.get("screen").height,
		backgroundColor: "rgba(0, 0, 0, .7)"
	},

	title: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: 24,
        lineHeight: 36
    },

    description: {
        color: "#f5ecf3",
        opacity: .95,
        lineHeight: 22,
        fontFamily: "OpenSansRegular"
    },
});