// src/types/axios.d.ts

import "axios";

declare module "axios" {
	/**
	 * Extiende la configuración interna de Axios para incluir nuestra propiedad de control '_retry'.
	 */
	export interface InternalAxiosRequestConfig {
		_retry?: boolean;
	}
}
