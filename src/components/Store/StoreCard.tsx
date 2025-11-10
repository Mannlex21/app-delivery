import { StyleSheet } from "react-native";
import { Button, Image, Text, XStack, YStack } from "tamagui";
import { API_URL } from "../../config/api";
import { Heart } from "@tamagui/lucide-icons";
import { IStore } from "../../types/store";

export const StoreCard = ({ store }: { store: IStore }) => (
	<YStack style={styles.card}>
		<XStack
			style={{
				padding: 5,
			}}
		>
			<YStack flex={3.8}>
				<Image
					source={{
						uri: `${API_URL}/public/images/comida.png`,
					}}
					style={{
						width: "100%",
						height: 150,
						borderRadius: 5,
					}}
					objectFit="cover"
				/>
			</YStack>

			<YStack paddingLeft={10} flex={5.2} gap={2}>
				<Text fontSize="$5" fontWeight="bold" color="$blue9">
					{store.name}
				</Text>
				<Text color="$gray10">{store.address.street}</Text>
				<Text color="$gray9">Teléfono: {store.phone}</Text>
			</YStack>
			<YStack flex={1}>
				<Button
					icon={Heart}
					backgroundColor={"transparent"}
					paddingHorizontal="$1"
					size="$3"
					focusStyle={{
						// Web CSS properties:
						outlineStyle: "none",
						outlineWidth: 0,
						outlineColor: "transparent",
						boxShadow: "none",

						// Mantén el feedback visual de Tamagui para accesibilidad
						scale: 0.98,
						opacity: 0.8,
					}}
				></Button>
			</YStack>
		</XStack>
	</YStack>
);
const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#f8f8f8",
	},
	card: {
		width: "100%",
		borderWidth: 2,
		borderColor: "#ccc",
		borderStyle: "solid",
		borderRadius: 10,

		// backgroundColor: "red",
	},
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 40,
		color: "#2c3e50",
	},
	userInfo: {
		marginBottom: 50,
		padding: 20,
		backgroundColor: "#ecf0f1",
		borderRadius: 10,
		width: "100%",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	label: {
		fontSize: 16,
		color: "#7f8c8d",
		marginBottom: 5,
	},
	email: {
		fontSize: 20,
		fontWeight: "600",
		color: "#34495e",
		marginBottom: 10,
	},
	status: {
		marginTop: 15,
		fontSize: 14,
		color: "#27ae60",
		fontWeight: "bold",
		textAlign: "center",
	},
});
