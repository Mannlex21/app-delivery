// src/screens/HomeScreen.tsx

import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import {
	Avatar,
	Button,
	ButtonText,
	ScrollView,
	Separator,
	Stack,
	Text,
	XStack,
	YStack,
} from "tamagui";
import { TopBar } from "../../../components/TobBar/TobBar";
import { Home } from "@tamagui/lucide-icons";
import AvatarUser from "../components/AvatarUser";

const ProfileScreen: React.FC = ({ navigation }: any) => {
	// 1. Usar el hook useAuth para acceder a los datos y funciones
	const { user, logout } = useAuth();

	// 2. Función para cerrar sesión
	const handleLogout = async () => {
		try {
			await logout(); // Llama a la función logout del contexto
		} catch (error) {
			console.error("Error al cerrar sesión", error);
		}
	};

	return (
		<YStack style={styles.container}>
			<TopBar
				id="search"
				navigation={navigation}
				showBackButton={true}
				disabled={false}
				marginBottom={15}
				content={
					<Text fontSize={28} fontWeight={"bold"}>
						Perfil
					</Text>
				}
			/>

			<AvatarUser
				url=""
				avatarType="2"
				marginBottom={"$5"}
				name={user.name}
			/>

			<ScrollView>
				<Text fontSize={20} fontWeight={"bold"}>
					Direcciones
				</Text>
				<YStack paddingHorizontal={5}>
					{[
						{
							id: 1,
							name: "Casa",
							street: "Montes de Oca",
							number: "121A",
							zip: "3200",
							icon: "Home",
						},
					].map((item) => (
						<XStack
							key={item.id}
							gap="$2"
							marginVertical={10}
							alignItems="center"
						>
							<Home />
							<Text fontSize={18}>{item.name}</Text>
						</XStack>
					))}
					<Stack marginVertical={10}>
						<Pressable>
							<Text fontSize={18} color={"green"}>
								Agregar
							</Text>
						</Pressable>
					</Stack>
				</YStack>

				<Separator marginVertical={5} />
				<YStack marginVertical={10}>
					<Pressable
						onPress={() => handleLogout()}
						style={({ pressed }) => [
							{
								opacity: pressed ? 0.5 : 1,
							},
						]}
					>
						<Text fontSize={20} fontWeight={"bold"}>
							{"Cambiar de cuenta"}
						</Text>
					</Pressable>
				</YStack>

				<YStack marginVertical={10}>
					<Pressable
						onPress={() => handleLogout()}
						style={({ pressed }) => [
							{
								opacity: pressed ? 0.5 : 1,
							},
						]}
					>
						<Text color="#D9415D" fontSize={20} fontWeight={"bold"}>
							{"Cerrar sesión"}
						</Text>
					</Pressable>
				</YStack>
			</ScrollView>
		</YStack>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	title: {
		fontWeight: "bold",
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

export default ProfileScreen;
