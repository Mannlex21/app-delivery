import { Pressable, StyleSheet } from "react-native";
import { XStack } from "tamagui";
import { SearchBar } from "./SearchBar";
import { ChevronLeft } from "@tamagui/lucide-icons";

export const TopBarStore = ({
	id,
	navigation,
	showBackButton = false,
	disabled = false,
}: any) => {
	return (
		<XStack style={styles.topBar}>
			{showBackButton && (
				<Pressable
					style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<ChevronLeft size="$2" />
				</Pressable>
			)}

			<SearchBar id={id} disabled={disabled} />
		</XStack>
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
