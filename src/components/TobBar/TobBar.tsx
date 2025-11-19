import { Pressable, StyleSheet } from "react-native";
import { Text, XStack } from "tamagui";
import { ChevronLeft } from "@tamagui/lucide-icons";

export const TopBar = ({
	id,
	navigation,
	showBackButton = false,
	content = "",
	...rest
}: any) => {
	return (
		<XStack style={styles.topBar} marginBottom={5} {...rest}>
			{showBackButton && (
				<Pressable
					style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<ChevronLeft size="$2" />
				</Pressable>
			)}
			{content}
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
	},
	backButton: {
		paddingRight: 10,
	},
});
