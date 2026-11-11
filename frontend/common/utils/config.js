// Backend API root, e.g. http://localhost:3001 (requests go to `${API_URL}/api/...`).
export const API_URL = process.env.NEXT_PUBLIC_BASE_URL

// The separate Tutelage AI app the "Tutelage AI" links point to (env name kept for Vercel).
export const TUTELAGE_AI_URL = process.env.NEXT_PUBLIC_BASE_URL_PROD
