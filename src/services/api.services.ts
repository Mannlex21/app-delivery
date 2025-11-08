// src/services/api.service.ts

import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config/api"; // Asegúrate de que esta ruta sea correcta

const api = axios.create({
	baseURL: API_URL,
	timeout: 10000, // Timeout de 10 segundos
});

// Variables de control para la renovación
let isRefreshing = false;
let failedQueue: Array<{
	resolve: (value: string | PromiseLike<string>) => void;
	reject: (reason?: any) => void;
}> = [];

// Función para procesar la cola de peticiones fallidas
const processQueue = (
	error: AxiosError | null,
	token: string | null = null
) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token!);
		}
	});
	failedQueue = [];
};

// ------------------------------------------------------------------
// 1. INTERCEPTOR DE SOLICITUD (Añadir Access Token)
// ------------------------------------------------------------------
api.interceptors.request.use(
	async (config) => {
		// Solo adjunta el token si no es una solicitud de login o registro
		if (
			config.url &&
			!config.url.endsWith("/login") &&
			!config.url.endsWith("/register")
		) {
			const token = await AsyncStorage.getItem("token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// ------------------------------------------------------------------
// 2. INTERCEPTOR DE RESPUESTA (Manejar 401 y Renovación)
// ------------------------------------------------------------------
api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		if (!error.response || !error.config) {
			// Si no hay respuesta o config, es un error de red o timeout.
			return Promise.reject(error);
		}
		const { config, response } = error;

		// Si no hay respuesta (ej. timeout) o el código no es 401, lo pasamos
		if (
			!response ||
			response.status !== 401 ||
			config.url?.endsWith("/refresh-token")
		) {
			return Promise.reject(error);
		}

		// 💡 Aquí manejamos el 401 (Token de Acceso Expirado)
		const originalRequest = config;

		// Si el error 401 ya se reintentó, lo descartamos
		if ((originalRequest as any)._retry) {
			await AsyncStorage.clear(); // Limpiar tokens
			// Aquí deberías navegar a la pantalla de Login (Logout forzado)
			// Ejemplo: navigation.navigate('Login');
			return Promise.reject(error);
		}

		if (isRefreshing) {
			// Si la renovación está en curso, ponemos la petición en cola
			return new Promise((resolve, reject) => {
				failedQueue.push({ resolve, reject });
			})
				.then((token) => {
					// Al resolverse la renovación, reintentamos la petición original
					originalRequest.headers.Authorization = "Bearer " + token;
					return api(originalRequest);
				})
				.catch((err) => {
					return Promise.reject(err);
				});
		}

		// Iniciar el proceso de renovación
		originalRequest._retry = true;
		isRefreshing = true;

		const refreshToken = await AsyncStorage.getItem("refreshToken");

		// Si no hay refresh token, no podemos renovar (Logout forzado)
		if (!refreshToken) {
			await AsyncStorage.clear();
			isRefreshing = false;
			processQueue(error, null);
			return Promise.reject(error);
		}

		try {
			// Llamada al nuevo endpoint del backend para obtener un nuevo Access Token
			const res = await axios.post(`${API_URL}/auth/refresh-token`, {
				refreshToken,
			});
			const newtoken = res.data.token;

			// 1. Guardar el nuevo Access Token
			await AsyncStorage.setItem("token", newtoken);

			// 2. Procesar la cola de peticiones fallidas
			processQueue(null, newtoken);

			// 3. Reintentar la petición original con el nuevo token
			originalRequest.headers.Authorization = `Bearer ${newtoken}`;
			return api(originalRequest);
		} catch (err) {
			// El Refresh Token también falló/expiró (Logout forzado)
			await AsyncStorage.clear();
			processQueue(err as AxiosError, null);
			// Aquí debes forzar la navegación al Login
			return Promise.reject(err);
		} finally {
			isRefreshing = false;
		}
	}
);

export default api;
