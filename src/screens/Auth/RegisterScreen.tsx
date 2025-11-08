// src/screens/Auth/RegisterScreen.tsx

import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	Alert,
	ScrollView,
} from "react-native";
import axios from "axios";
import { API_URL } from "../../config/api"; // Asegúrate de que la ruta sea correcta

const RegisterScreen = ({ navigation }: any) => {
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

			const { token, user } = response.data;

			// 2. Manejo del éxito
			// En una aplicación real, guardarías el token aquí al igual que en el login.
			// Por simplicidad, solo alertamos y navegamos.

			Alert.alert(
				"¡Registro Exitoso! 🎉",
				`Bienvenido, ${user.name}. Ahora puedes iniciar sesión.`
			);

			// Navegar de vuelta a la pantalla de Login después del registro
			navigation.navigate("Login");
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
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Crear Cuenta</Text>

			<TextInput
				style={styles.input}
				placeholder="Nombre Completo"
				value={name}
				onChangeText={setName}
			/>
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
				placeholder="Contraseña (Mínimo 6 caracteres)"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<TextInput
				style={styles.input}
				placeholder="Teléfono (Ej: 1234567890)"
				value={phone}
				onChangeText={setPhone}
				keyboardType="phone-pad"
			/>

			<View style={styles.buttonContainer}>
				<Button
					title={loading ? "Registrando..." : "Registrarse"}
					onPress={handleRegister}
					disabled={loading}
				/>
			</View>

			<Button
				title="¿Ya tienes cuenta? Ingresar"
				onPress={() => navigation.navigate("Login")}
				color="#841584"
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
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
