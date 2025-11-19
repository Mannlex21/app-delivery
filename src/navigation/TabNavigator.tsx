// navigation/TabNavigator.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { XStack, Stack, Text, useTheme } from "tamagui";
import { TabBarIcon } from "../components/TabBarIcon";
import ProfileScreen from "../screens/Profile/AccountScreen";
import { HomeStackNavigator } from "./HomeStack";
import { AccountStack } from "./AccountStack";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
	const theme = useTheme();

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: { height: 0, display: "none" }, // Oculta la barra nativa
			}}
			tabBar={({ state, descriptors, navigation }) => (
				<XStack
					background="$background"
					padding="$3"
					justifyContent="space-around"
					alignItems="center"
				>
					{state.routes.map((route, index) => {
						const { options } = descriptors[route.key];
						const isFocused = state.index === index;
						const label =
							options.tabBarLabel !== undefined
								? options.tabBarLabel
								: options.title !== undefined
								? options.title
								: route.name;
						const iconName = route.name as "Home" | "Account"; // Tipado

						const onPress = () => {
							// Lógica de navegación
							const event = navigation.emit({
								type: "tabPress",
								target: route.key,
								canPreventDefault: true,
							});
							if (!isFocused && !event.defaultPrevented) {
								navigation.navigate(route.name);
							}
						};
						return (
							<Stack
								key={route.key}
								flex={1}
								// padding="$2"
								borderRadius="$6"
								background={
									isFocused ? "$blue3" : "$background"
								}
								onPress={onPress}
								alignItems="center"
								justifyContent="center"
								// height={"100%"}
							>
								{/* 💡 Icono y Texto con estilos Tamagui */}
								<TabBarIcon
									name={iconName}
									color={isFocused ? "active" : "inactive"}
								/>
								<Text
									// fontSize="$3"
									fontWeight={isFocused ? "bold" : "normal"}
								>
									{label.toString()}
								</Text>
							</Stack>
						);
					})}
				</XStack>
			)}
		>
			<Tab.Screen
				name="Home"
				component={HomeStackNavigator}
				options={{ title: "Inicio" }}
			/>

			<Tab.Screen
				name="Account"
				component={AccountStack}
				options={{ title: "Cuenta" }}
			/>
			{/* ... más pantallas ... */}
		</Tab.Navigator>
	);
};
