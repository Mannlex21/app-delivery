import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { Stack, Text, YStack } from "tamagui";
import { StoreCard } from "./StoreCard";
import { useStores } from "../../hooks/useStores";

export const StoreList = () => {
	const { stores, loading, error, isRefreshing, refetch } = useStores();
	return (
		<>
			{/* 1. Indicador de Carga */}
			{loading && (
				<Stack alignItems="center" justifyContent="center" flex={1}>
					<ActivityIndicator size="large" color="#4285F4" />
					<Text marginTop="$3">Cargando tiendas...</Text>
				</Stack>
			)}

			{/* 2. Manejo de Error */}
			{error && (
				<YStack alignItems="center" justifyContent="center" flex={1}>
					<Text color="$red9" textAlign="center" fontSize="$5">
						Error: {error}
					</Text>
				</YStack>
			)}

			{/* 3. Lista de Tiendas */}
			{!loading && !error && (
				<FlatList
					data={stores}
					keyExtractor={(item, index) => item._id}
					renderItem={({ item }) => <StoreCard store={item} />}
					ListEmptyComponent={() => (
						<Text color="$gray10" textAlign="center">
							No se encontraron tiendas activas.
						</Text>
					)}
					contentContainerStyle={{ paddingBottom: 20 }}
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing} // Estado booleano
							onRefresh={refetch} // Función de recarga
							// 💡 PROPIEDADES PARA CAMBIAR EL COLOR:
							tintColor="#F48542" // Color del spinner en iOS (ejemplo: naranja)
							colors={["#F48542"]} // Color(es) del spinner en Android (ejemplo: naranja)
							progressBackgroundColor="#FFFFFF" // Color de fondo del área de progreso (Solo Android)
						/>
					}
				/>
			)}
		</>
	);
};
