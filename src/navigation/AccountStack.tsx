// navigation/HomeStack.tsx

import React from "react";
import HomeScreen from "../screens/Home/HomeScreen";
import SearchScreen from "../screens/Home/pages/SearchScreen";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import SettingsScreen from "../screens/Profile/AccountScreen";
import ProfileScreen from "../screens/Profile/pages/ProfileScreen";
const Stack = createStackNavigator();

export const AccountStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				// 💡 Aplica la animación estándar y fluida de iOS a *todo* el stack
				...TransitionPresets.SlideFromRightIOS,
			}}
		>
			{/* 1. Pantalla Base (La que aparece al tocar el tab) */}
			<Stack.Screen
				name="SettingsScreen"
				component={SettingsScreen}
				options={{
					headerShown: false,
					animation: "default",
					presentation: "card",
				}} // Usualmente se oculta el header aquí
			/>

			{/* 2. Sub-pantalla (Se apila encima de HomeBase) */}
			<Stack.Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};
