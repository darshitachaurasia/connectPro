const configuredBackendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/+$/, "");
const BASE_URL = configuredBackendUrl
    ? (/\/api$/i.test(configuredBackendUrl) ? configuredBackendUrl : `${configuredBackendUrl}/api`)
    : "/api";

export { BASE_URL };
