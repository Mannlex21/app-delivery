// src/types/store.ts
export interface IStore {
	_id: string;
	name: string;
	phone: string;
	email: string;
	imageUrl: string;
	address: IStoreAddress; // Dirección anidada

	// Campo GeoJSON para búsquedas por proximidad (¡crucial en delivery!)
	location: {
		type: "Point";
		coordinates: [number, number]; // [longitude, latitude]
	};

	// Horarios, estado y metadatos
	isActive: boolean; // Si la tienda está abierta y visible
	createdAt: Date;
	updatedAt: Date;
}

export interface IStoreAddress {
	street: string;
	city: string;
	zipCode: string;
	// Coordenadas para mostrar en el mapa
	latitude: number;
	longitude: number;
}
