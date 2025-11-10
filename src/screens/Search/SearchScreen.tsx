// src/screens/HomeScreen.tsx

import React, { useCallback, useEffect, useRef } from "react";
import { Button, H3, XStack, YStack } from "tamagui";
import { StoreList } from "../../components/Store/StoreList";
import { SearchBar } from "../../components/Store/SearchBar";
import { ArrowLeft, ChevronLeft } from "@tamagui/lucide-icons";
import { Pressable, StyleSheet } from "react-native";
import type { Input as TamaguiInputType } from "tamagui";
import { useFocusEffect } from "@react-navigation/native";
import { TopBarStore } from "../../components/Store/TopBarStore";

const SearchScreen: React.FC = ({ navigation }: any) => {
	const searchInputRef = useRef<TamaguiInputType | null>(null);

	// 💡 2. Usar useFocusEffect en la pantalla
	useFocusEffect(
		useCallback(() => {
			// 💡 USAR setTimeout con 0ms
			const timer = setTimeout(() => {
				if (searchInputRef.current) {
					searchInputRef.current.focus();
				}
			}, 0); // Esperar al próximo tick del ciclo de eventos

			// 💡 Limpieza: Detener el timer si el foco se pierde antes de que se dispare
			return () => clearTimeout(timer);
		}, [])
	);

	return (
		<YStack style={styles.container}>
			<TopBarStore
				id="search"
				navigation={navigation}
				showBackButton={true}
				disabled={false}
			/>
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
	backButton: {
		paddingRight: 10,
	},
});
export default SearchScreen;
