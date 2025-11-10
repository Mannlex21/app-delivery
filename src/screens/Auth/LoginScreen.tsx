// src/screens/Auth/LoginScreen.tsx

import React, { useState } from "react";
import { StyleSheet, Alert, Pressable } from "react-native";
import { Button, Input, Label, Text, YStack } from "tamagui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api.services";
import { useAuth } from "../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }: any) => {
	const { login } = useAuth();
	const [email, setEmail] = useState("prueba@gmail.com");
	const [password, setPassword] = useState("prueba");
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		setLoading(true);

		try {
			// 1. Petición al backend usando el servicio 'api'
			// NOTA: Para login/register, api.service.ts no adjunta el token.
			const response = await api.post("/auth/login", {
				email,
				password,
			});

			const { token, refreshToken, user } = response.data;

			// 2. Guardar AMBOS tokens de forma segura
			await AsyncStorage.setItem("token", token);
			await AsyncStorage.setItem("refreshToken", refreshToken);

			// 3. Navegar a la pantalla principal
			Alert.alert("Éxito", `Bienvenido, ${user.name}!`);
			// navigation.navigate('App'); // Navegar a la stack principal
			await login(token, refreshToken, user);
		} catch {
			// ... manejo de errores ...
		} finally {
			setLoading(false);
		}
	};

	return (
		<YStack flex={1} justifyContent="center" background="$background">
			<YStack paddingHorizontal="$4">
				<Label htmlFor="email">Email</Label>
				<Input
					style={styles.wFull}
					id="email"
					value={email}
					size="$4"
					borderWidth={2}
					keyboardType="email-address"
					onChangeText={setEmail}
					placeholder="Ingrese un correo Electrónico"
				/>
			</YStack>
			<YStack paddingHorizontal="$4">
				<Label htmlFor="password">Contraseña</Label>
				<Input
					style={styles.wFull}
					id="password"
					value={password}
					size="$4"
					borderWidth={2}
					onChangeText={setPassword}
					secureTextEntry
					placeholder="Ingrese su contraseña"
				/>
			</YStack>
			<YStack
				alignItems="center"
				gap="$5"
				top="$5"
				paddingHorizontal="$4"
			>
				<Button
					size="$4"
					fontWeight={"500"}
					fontSize={20}
					width={"100%"}
					onPress={handleLogin}
					disabled={loading}
				>
					Iniciar sesión
				</Button>
				<Pressable
					// onPress={handlePress}
					style={({ pressed }) => [
						{
							opacity: pressed ? 0.5 : 1.0,
						},
					]}
				>
					<Text color={"#D9415D"} fontSize={14}>
						¿Olvidaste la contraseña?
					</Text>
				</Pressable>
			</YStack>
			<YStack
				alignItems="center"
				position="absolute"
				bottom="$4"
				width={"100%"}
			>
				<Pressable
					onPress={() => navigation.navigate("Register")}
					style={({ pressed }) => [
						{
							opacity: pressed ? 0.5 : 1.0,
						},
					]}
				>
					<Text
					// Posición absoluta para fijarlo
					>
						{"¿No tienes cuenta? "}
						<Text color="#D9415D">{"Registrate"}</Text>
					</Text>
				</Pressable>
			</YStack>
		</YStack>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#f8f8f8",
	},
	wFull: {
		width: "100%",
	},
	container: {
		flex: 1,
		gap: 1,
		justifyContent: "center",
		padding: 20,
		backgroundColor: "#f5f5f5",
	},
	title: {
		fontSize: 24,
		marginBottom: 30,
		textAlign: "center",
		fontWeight: "bold",
	},
	input: {
		height: 50,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 15,
		paddingHorizontal: 15,
		backgroundColor: "#fff",
	},
});

export default LoginScreen;
