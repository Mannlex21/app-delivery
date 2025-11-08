// src/screens/HomeScreen.tsx

import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen: React.FC = () => {
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
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<Text style={styles.title}>¡Bienvenido a Mandados!</Text>

				{/* Muestra los datos del usuario si están disponibles */}
				{user && (
					<View style={styles.userInfo}>
						<Text style={styles.label}>Estás conectado como:</Text>
						{/* NOTA: En este punto, 'user' solo contiene { id: 'loaded' } 
                           Necesitarías cargar los datos completos del perfil con /auth/me
                           o guardarlos en el login. */}
						<Text style={styles.email}>
							ID de Sesión: {user.id}
						</Text>
						<Text style={styles.status}>
							¡Tu token está siendo monitoreado y renovado
							automáticamente! 🎉
						</Text>
					</View>
				)}

				<Button
					title="Cerrar Sesión"
					onPress={handleLogout}
					color="#e74c3c"
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#f8f8f8",
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

export default HomeScreen;
