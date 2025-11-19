import React from "react";
import {
	Accessibility,
	CircleHelp,
	Home,
	Info,
	List,
	ShieldUser,
	Smartphone,
	Tag,
	User,
	UserPlus,
	Wallet,
} from "@tamagui/lucide-icons";
import { SizeTokens } from "tamagui";

// 1. Definir el Mapa de Componentes de Icono
// Usamos Record<string, ...> para tipar el objeto y que acepte cualquier string como clave
const IconMap: Record<string, React.FC<any>> = {
	Home: Home,
	Account: User,
	List: List,
	Tag: Tag,
	CircleHelp: CircleHelp,
	UserPlus: UserPlus,
	ShieldUser: ShieldUser,
	Accessibility: Accessibility,
	Smartphone: Smartphone,
	Wallet: Wallet,
	Info: Info,
};

// 2. Inferir el Tipo de Props de Icono
// Seguimos infiriendo las props para que las props restantes sean correctas
type LucideIconProps = React.ComponentPropsWithoutRef<typeof Home>;

// 3. Definir la Interfaz de Props Modificada
interface IconResolverProps extends LucideIconProps {
	// CLAVE: La prop 'name' ahora es un string genérico
	name: string;
	size?: LucideIconProps["size"] | SizeTokens;
}

export const IconResolver: React.FC<IconResolverProps> = (props) => {
	const { name, size, ...rest } = props;

	// Buscamos el componente usando el string 'name'
	// Tenemos que forzar el tipo de clave a 'keyof typeof IconMap' para evitar un error de TS
	// ya que 'name' es un string genérico, pero el acceso requiere una clave válida.
	const IconComponent = IconMap[name as keyof typeof IconMap];

	if (!IconComponent) {
		// Devuelve un icono de fallback, null, o un log de error
		console.warn(`Icono no encontrado: ${name}`);
		return null;
	}

	// Renderizamos el componente con las props restantes
	return <IconComponent size={size} {...rest} />;
};
