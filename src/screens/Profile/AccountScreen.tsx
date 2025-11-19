import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { ScrollView, Stack, Text, XStack, YStack } from "tamagui";
import AvatarUser from "./components/AvatarUser";
import { IconResolver } from "../../enums/iconResolver";
import { useAuth } from "../../context/AuthContext";

const SettingsScreen: React.FC = ({ navigation }: any) => {
	const { user, logout } = useAuth();
	console.log(user);
	const options = [
		{ id: 1, title: "Promociones", icon: "Tag", rout: "" },
		{ id: 2, title: "Ayuda", icon: "CircleHelp", rout: "" },
		{ id: 3, title: "Invita a un amigo", icon: "UserPlus", rout: "" },
		{ id: 4, title: "Privacidad", icon: "ShieldUser", rout: "" },
		{ id: 5, title: "Accesibilidad", icon: "Accessibility", rout: "" },
		{ id: 6, title: "Comunicación", icon: "Smartphone", rout: "" },
		{
			id: 7,
			title: "Gana dinero haciendo entregas",
			icon: "Wallet",
			rout: "",
		},
		{ id: 8, title: "Acerca de nosotros", icon: "Info", rout: "" },
	];
	return (
		<YStack alignItems="center" style={styles.container}>
			<Stack width={"100%"} paddingVertical={10}>
				<Pressable
					onPress={() => {
						navigation.navigate("ProfileScreen");
					}}
				>
					<AvatarUser url="" name={user.name} />
				</Pressable>
			</Stack>

			<ScrollView marginTop={15}>
				{options.map((item) => {
					return (
						<XStack
							key={`optionAccount-${item.id}`}
							alignItems="center"
							// marginVertical={5}
							padding={10}
						>
							<IconResolver
								name={item.icon}
								color="$color"
								marginRight="$5"
							/>
							<Text fontSize={18} width={"100%"}>
								{item.title}
							</Text>
						</XStack>
					);
				})}
			</ScrollView>
		</YStack>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
});

export default SettingsScreen;
