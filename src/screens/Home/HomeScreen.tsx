// src/screens/HomeScreen.tsx

import React from "react";
import { YStack } from "tamagui";
import { StoreList } from "../../components/Store/StoreList";
import { Pressable, StyleSheet } from "react-native";
import { TopBarStore } from "../../components/Store/TopBarStore";

const HomeScreen: React.FC = ({ navigation }: any) => {
	return (
		<YStack style={styles.container}>
			<Pressable
				onPress={() => {
					navigation.navigate("SearchScreen");
				}}
			>
				<TopBarStore
					id="searchDisabled"
					navigation={navigation}
					disabled={true}
				/>
			</Pressable>

			<StoreList />
		</YStack>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		width: "100%",
	},
	topBar: {
		alignItems: "center",
		marginBottom: 20,
	},
});
export default HomeScreen;
