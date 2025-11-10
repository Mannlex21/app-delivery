// src/hooks/useStores.ts
import { useState, useEffect } from "react";
import { IStore } from "../types/store";
import api from "../services/api.services";
const fetchStoresData = async (
	setStores: (s: IStore[]) => void,
	setError: (e: string | null) => void,
	setLoading: (l: boolean) => void,
	setIsRefreshing: (r: boolean) => void,
	isInitialLoad: boolean
) => {
	try {
		setLoading(true);
		setError(null);

		// Consulta GET a la API de tiendas
		const response = await api.get(`/store/city?city=${"Tuxpan"}`);

		setStores([...response.data]);
	} catch (err) {
		console.error("Error fetching stores:", err);
		setError("No se pudieron cargar las tiendas. Intenta de nuevo.");
	} finally {
		setLoading(false);
		setIsRefreshing(false);
	}
};
export const useStores = () => {
	const [stores, setStores] = useState<IStore[]>([]);
	const [loading, setLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	// 1. Efecto de carga inicial (solo se ejecuta una vez al montar)
	useEffect(() => {
		fetchStoresData(setStores, setError, setLoading, setIsRefreshing, true);
	}, []);

	// 2. Función de recarga (para el FlatList onRefresh)
	const refetch = () => {
		setIsRefreshing(true);
		// Llama a la función de fetch, indicando que NO es la carga inicial
		fetchStoresData(
			setStores,
			setError,
			setLoading,
			setIsRefreshing,
			false
		);
	};

	return { stores, loading, error, refetch, isRefreshing };
};
