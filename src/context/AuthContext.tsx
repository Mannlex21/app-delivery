// src/context/AuthContext.tsx

import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api.services";

// Definición de Tipos
interface AuthContextType {
	user: any; // Aquí usarías tu interfaz IUser si la definiste
	authLoading: boolean;
	login: (
		token: string,
		refreshToken: string,
		userData: any
	) => Promise<void>;
	logout: () => Promise<void>;
}

// Valores iniciales
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// -----------------------------------------------------------
// 1. Proveedor del Contexto
// -----------------------------------------------------------
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
	children,
}) => {
	const [user, setUser] = useState<any>(null);
	const [authLoading, setAuthLoading] = useState(true); // Indica si la app está cargando la sesión

	// Función para guardar tokens y usuario, y actualizar el estado
	const login = async (
		token: string,
		refreshToken: string,
		userData: any
	) => {
		await AsyncStorage.setItem("token", token);
		await AsyncStorage.setItem("refreshToken", refreshToken);
		setUser(userData);
	};

	// Función para limpiar tokens y cerrar sesión
	const logout = async () => {
		try {
			const refreshToken = await AsyncStorage.getItem("refreshToken");
			console.log(refreshToken);
			// 1. Opcional pero recomendado: Llamar al backend para revocar el RT
			if (refreshToken) {
				// Usa una llamada simple de axios aquí, no necesariamente el interceptor 'api'
				await api.post(`/auth/logout`, { refreshToken });
			}
		} catch (error) {
			// Ignoramos errores de red/API aquí. Lo importante es limpiar localmente.
			console.warn(
				"No se pudo revocar el Refresh Token, pero se cerrará la sesión localmente."
			);
		} finally {
			// 2. Limpiar el almacenamiento local (Obligatorio)
			await AsyncStorage.clear();
			setUser(null);
		}
	};

	// -----------------------------------------------------------
	// 2. Lógica para cargar la sesión al iniciar la aplicación
	// -----------------------------------------------------------
	useEffect(() => {
		const loadUserFromStorage = async () => {
			let storedToken = null;
			try {
				storedToken = await AsyncStorage.getItem("token");
				const storedRefresh = await AsyncStorage.getItem(
					"refreshToken"
				);

				if (storedToken && storedRefresh) {
					// Opcional: Podrías llamar a un endpoint /auth/me para obtener los datos del usuario
					// y verificar que el token es válido
					// Por simplicidad, asumimos que el token es válido por un momento

					// El interceptor se encargará de renovar si el token expiró.

					// Asumimos que si hay token, el usuario está logueado (necesitarás el objeto de usuario)
					// Aquí harías una llamada a /auth/me o guardarías los datos del usuario al loggearte.
					// Por ahora, solo seteamos el estado como logueado:
					setUser({ id: "loaded" });
				}
			} catch (error) {
				console.error("Error al cargar sesión:", error);
			} finally {
				setAuthLoading(false);
			}
		};

		loadUserFromStorage();
	}, []);

	return (
		<AuthContext.Provider value={{ user, authLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// -----------------------------------------------------------
// 3. Hook Personalizado para usar el contexto
// -----------------------------------------------------------
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth debe ser usado dentro de un AuthProvider");
	}
	return context;
};
