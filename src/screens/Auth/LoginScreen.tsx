// src/screens/Auth/LoginScreen.tsx

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api.services";
import { useAuth } from "../../context/AuthContext";

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

			const { token, refreshToken, user } = response.data; // 👈 Esperar ambos tokens

			// 2. Guardar AMBOS tokens de forma segura
			await AsyncStorage.setItem("token", token);
			await AsyncStorage.setItem("refreshToken", refreshToken);

			// 3. Navegar a la pantalla principal
			Alert.alert("Éxito", `Bienvenido, ${user.name}!`);
			// navigation.navigate('App'); // Navegar a la stack principal
			await login(token, refreshToken, user);
		} catch (error: any) {
			// ... manejo de errores ...
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Iniciar Sesión 🔐</Text>
			<TextInput
				style={styles.input}
				placeholder="Correo Electrónico"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Contraseña"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<Button
				title={loading ? "Cargando..." : "Ingresar"}
				onPress={handleLogin}
				disabled={loading}
			/>
			<Button
				title="¿No tienes cuenta? Regístrate"
				onPress={() => navigation.navigate("Register")}
				color="#841584"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
