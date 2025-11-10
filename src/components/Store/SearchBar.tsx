import { useFocusEffect } from "@react-navigation/native";
import { Search } from "@tamagui/lucide-icons";
import { forwardRef, Ref, useCallback, useEffect, useRef } from "react";
import { Button, Group, Input, YStack } from "tamagui";
import type { Input as TamaguiInputType } from "tamagui";
export const SearchBar = forwardRef<
	TamaguiInputType,
	{
		id: string;
		onPress?: () => void;
		showSoftInputOnFocus?: boolean;
		disabled?: boolean;
	}
>(({ id, onPress, showSoftInputOnFocus = true, disabled = false }, ref) => {
	return (
		<YStack flexGrow={1} height={50}>
			<Group
				orientation="horizontal"
				backgroundColor={"#e6e6e6"}
				flex={1}
				alignItems="center"
			>
				<Group.Item>
					<Search
						size="$2"
						color={"#616161"}
						borderRadius={4}
						marginLeft={10}
					>
						First
					</Search>
				</Group.Item>
				<Group.Item>
					<Input
						ref={ref}
						flex={1}
						id={id}
						borderWidth={0}
						color={"#616161"}
						backgroundColor={"#e6e6e6"}
						size="$4"
						secureTextEntry
						placeholder="Ingrese su contraseña"
						onPress={onPress}
						showSoftInputOnFocus={showSoftInputOnFocus}
						disabled={disabled}
						autoFocus
					/>
				</Group.Item>
			</Group>
		</YStack>
	);
});
