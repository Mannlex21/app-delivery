import {
	ChevronRight,
	CircleUser,
	CircleUserRound,
	User,
} from "@tamagui/lucide-icons";
import React from "react";
import { Avatar, Text, XStack, YStack } from "tamagui";
interface AvatarUserProps {
	avatarType?: "1" | "2"; // Restringimos los valores posibles
	url?: string;
	name?: string;
	// Puedes extender las props de XStack si es necesario, pero omitimos 'any'
	[key: string]: any; // Usamos un index signature solo para permitir {...rest}
}
// ,
const AvatarUser: React.FC<AvatarUserProps> = (props: AvatarUserProps) => {
	const { avatarType = "1", url, name, ...rest } = props;

	if (avatarType === "2") {
		return (
			<YStack
				gap="$2"
				width="100%"
				alignItems="center"
				justifyContent="center"
				{...rest}
			>
				<ImageAvatar url={url} />
				<Text
					fontSize={28}
					numberOfLines={2}
					ellipsizeMode="tail"
					textAlign="center"
				>
					{name}
				</Text>
			</YStack>
		);
	}

	return (
		<XStack gap="$2" width="100%" justifyContent="space-between" {...rest}>
			<XStack
				alignItems="center"
				justifyContent="center"
				gap="$3"
				flexShrink={1}
			>
				<ImageAvatar url={url} />
				<Text
					flexShrink={1}
					fontSize={28}
					numberOfLines={2}
					ellipsizeMode="tail"
					fontWeight={"bold"}
					textAlign="left"
				>
					{name}
				</Text>
			</XStack>
			<YStack width={"15%"} alignItems="center" justifyContent="center">
				<ChevronRight size="$2" />
			</YStack>
		</XStack>
	);
};

const ImageAvatar: React.FC<AvatarUserProps> = ({ url }: any) => {
	const circleSize = 80;
	return (
		<Avatar circular size={circleSize}>
			{url && <Avatar.Image accessibilityLabel="Cam" src={url} />}
			<Avatar.Fallback alignItems="center" justifyContent="center">
				<User
					size={circleSize}
					color="$color"
					backgroundColor={"#999999"}
				/>
			</Avatar.Fallback>
		</Avatar>
	);
};

export default AvatarUser;
