// src/screens/Auth/RegisterScreen.tsx

import React, { useState } from "react";
import { StyleSheet, Alert, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import axios from "axios";
import { API_URL } from "../../config/api"; // Asegúrate de que la ruta sea correcta
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input, Label, ScrollView, Text, YStack } from "tamagui";

const RegisterScreen = ({ navigation }: any) => {
	const { login } = useAuth();
	// Definición del estado para los campos del formulario
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [loading, setLoading] = useState(false);

	const handleRegister = async () => {
		// Validación simple de campos
		if (!name || !email || !password || !phone) {
			Alert.alert("Error", "Todos los campos son obligatorios.");
			return;
		}

		setLoading(true);
		try {
			// 1. Petición al backend para el registro
			const response = await axios.post(`${API_URL}/auth/register`, {
				name,
				email,
				password,
				phone,
				// El rol se establecerá por defecto en 'client' en el backend
			});

			const { token, refreshToken, user } = response.data;

			// 2. Manejo del éxito
			await AsyncStorage.setItem("token", token);
			await AsyncStorage.setItem("refreshToken", refreshToken);

			Alert.alert(
				"¡Registro Exitoso! 🎉",
				`Bienvenido, ${user.name}. Ahora puedes iniciar sesión.`
			);

			// Navegar de vuelta a la pantalla de Login después del registro
			// navigation.navigate("Login");
			await login(token, refreshToken, user);
		} catch (error: any) {
			console.error(
				"Error de Registro:",
				error.response?.data || error.message
			);

			// Extrae el mensaje de error del backend
			const message =
				error.response?.data?.message ||
				"Error al crear la cuenta. Intente de nuevo.";
			Alert.alert("Error", message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
      // 'padding' es generalmente mejor para iOS, 'height' o 'position' para Android
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }} // Es crucial que KeyboardAvoidingView tenga flex: 1
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} 
    >
		<ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        flex={1} // Tamagui shorthand para flex: 1
      >
		<YStack flex={1} justifyContent="center" background="$background">
			<Text style={styles.title}>Crear Cuenta</Text>
			<YStack paddingHorizontal="$4">
				<Label htmlFor="name">Nombre</Label>
				<Input
					style={styles.wFull}
					id="name"
					value={name}
					size="$4"
					borderWidth={2}
					onChangeText={setName}
					placeholder="Ingrese su nombre completo"
				/>
			</YStack>
			<YStack paddingHorizontal="$4">
				<Label htmlFor="email">Correo electronico</Label>
				<Input
					style={styles.wFull}
					id="email"
					value={email}
					size="$4"
					borderWidth={2}
					onChangeText={setEmail}
					keyboardType="email-address"
					autoCapitalize="none"
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
					placeholder="Contraseña (Mínimo 6 caracteres)"
				/>
			</YStack>
			<YStack paddingHorizontal="$4">
				<Label htmlFor="phone">Teléfono</Label>
				<Input
					style={styles.wFull}
					id="phone"
					value={phone}
					size="$4"
					borderWidth={2}
					onChangeText={setPhone}
					keyboardType="phone-pad"
					placeholder="Ej: 1234567890"
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
					onPress={handleRegister}
					disabled={loading}
				>
					{loading ? "Registrando..." : "Registrarse"}
				</Button>
			</YStack>
			<YStack
				alignItems="center"
				position="absolute"
				bottom="$4"
				width={"100%"}
			>
				<Pressable
					onPress={() => navigation.navigate("Login")}
					style={({ pressed }) => [
						{
							opacity: pressed ? 0.5 : 1,
						},
					]}
				>
					<Text>
						{"¿Ya tienes cuenta? "}
						<Text color="#D9415D">{"Ingresar"}</Text>
					</Text>
				</Pressable>
			</YStack>
		</YStack>
	  </ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	wFull: {
		width: "100%",
	},
	safeArea: {
		flex: 1,
		backgroundColor: "#f8f8f8",
	},
	container: {
		flexGrow: 1, // Permite que ScrollView funcione
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
	buttonContainer: {
		marginBottom: 20, // Espacio después del botón principal
	},
});

export default RegisterScreen;
