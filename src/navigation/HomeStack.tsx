// navigation/HomeStack.tsx

import React from "react";
import HomeScreen from "../screens/Home/HomeScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
const Stack = createStackNavigator();

export const HomeStackNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				// 💡 Aplica la animación estándar y fluida de iOS a *todo* el stack
				...TransitionPresets.SlideFromRightIOS,
			}}
		>
			{/* 1. Pantalla Base (La que aparece al tocar el tab) */}
			<Stack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					headerShown: false,
					title: "Inicio",
					animation: "default",
					presentation: "card",
				}} // Usualmente se oculta el header aquí
			/>

			{/* 2. Sub-pantalla (Se apila encima de HomeBase) */}
			<Stack.Screen
				name="SearchScreen"
				component={SearchScreen}
				options={{
					headerShown: false,
					title: "Detalle del Post",
				}}
			/>
		</Stack.Navigator>
	);
};
