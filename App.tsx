// App.tsx (Nuevo)

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import RegisterScreen from "./src/screens/Auth/RegisterScreen";
import HomeScreen from "./src/screens/Home/HomeScreen";

const Stack = createNativeStackNavigator();

// Rutas de Autenticación
const AuthStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name="Login" component={LoginScreen} />
		<Stack.Screen name="Register" component={RegisterScreen} />
	</Stack.Navigator>
);

// Rutas de la Aplicación (Aquí irían pedidos, mapas, etc.)
const AppStack = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="Home"
			component={HomeScreen}
			options={{ title: "Mis Mandados" }}
		/>
		{/* Otras rutas protegidas... */}
	</Stack.Navigator>
);

// -----------------------------------------------------------
// 4. Componente Router Principal
// -----------------------------------------------------------
const RootNavigator = () => {
	const { user, authLoading } = useAuth();

	// Muestra un loader mientras se verifica la sesión
	if (authLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	// Muestra el stack de la aplicación o el de autenticación
	return (
		<NavigationContainer>
			{user ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	);
};

export default function App() {
	return (
		// Envuelve toda la app con el proveedor de autenticación
		<AuthProvider>
			<RootNavigator />
		</AuthProvider>
	);
}
