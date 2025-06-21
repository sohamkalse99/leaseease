import localConfig from "./env/local";

let effectiveConfig: {
    NAME: string,
    PORT: number | string,
    CORS_OPTIONS: any,
    MONGO_URL: string,
    BACKEND_URL: string,
    FRONTEND_URL: string,
    JWT_KEY: string,
    CLAUDE_KEY: string
} = localConfig;


export default effectiveConfig;

