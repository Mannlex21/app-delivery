// components/TabBarIcon.tsx
import React from "react";
import { useTheme } from "tamagui";
import { Home, List, User } from "@tamagui/lucide-icons"; // O tus propios iconos

interface TabBarIconProps {
	name: "Home" | "List" | "Account"; // Nombres de los iconos
	color: string;
}

export const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color }) => {
	// const theme = useTheme(); // Acceder a los tokens del tema
	const size = 24;

	switch (name) {
		case "Home":
			// Usar el token del tema para el color si está activo
			return (
				<Home
					size={size}
					// color={
					// 	color === "active" ? theme.blue9.val : theme.gray10.val
					// }
				/>
			);
		case "Account":
			// Usar el token del tema para el color si está activo
			return (
				<User
					size={size}
					// color={
					// 	color === "active" ? theme.blue9.val : theme.gray10.val
					// }
				/>
			);
		case "List":
			return (
				<List
					size={size}
					// color={
					// 	color === "active" ? theme.blue9.val : theme.gray10.val
					// }
				/>
			);
		default:
			return null;
	}
};
