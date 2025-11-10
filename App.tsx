// App.tsx (Nuevo)

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import RegisterScreen from "./src/screens/Auth/RegisterScreen";
import { TamaguiProvider } from "tamagui";
import { config } from "./tamagui.config";
import { TabNavigator } from "./src/navigation/TabNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
const Stack = createNativeStackNavigator();

// Rutas de Autenticación
const AuthStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name="Login" component={LoginScreen} />
		<Stack.Screen name="Register" component={RegisterScreen} />
	</Stack.Navigator>
);

// -----------------------------------------------------------
// 4. Componente Router Principal
// -----------------------------------------------------------
const RootNavigator = () => {
	// 💡 Aquí se usan los hooks, por lo tanto, esto debe estar dentro de AuthProvider.
	const { user, authLoading } = useAuth();

	// Estilos Tamagui para el Loader
	const LoaderView = (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<ActivityIndicator size="large" color="#0000ff" />
		</View>
	);

	// Muestra un loader mientras se verifica la sesión
	if (authLoading) {
		return LoaderView;
	}

	// Muestra el stack de la aplicación o el de autenticación
	return (
		// NavigationContainer debe estar en RootNavigator
		<NavigationContainer>
			{user ? <TabNavigator /> : <AuthStack />}
		</NavigationContainer>
	);
};

export default function App() {
	return (
		// 1. 💡 PROVEEDOR DE ÁREA SEGURA DEBE ESTAR LO MÁS ALTO POSIBLE
		<SafeAreaProvider>
			{/* 2. Proveedor de Autenticación (Necesario antes de RootNavigator) */}
			<AuthProvider>
				{/* 3. Proveedor de Tamagui (Debe envolver el resto del contenido visual) */}
				<TamaguiProvider config={config} defaultTheme="light">
					{/* 4. 💡 SafeAreaView envuelve el contenido para aplicar las insets */}
					<SafeAreaView style={{ flex: 1 }}>
						<RootNavigator />
					</SafeAreaView>
				</TamaguiProvider>
			</AuthProvider>
		</SafeAreaProvider>
	);
}
