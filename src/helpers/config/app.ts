type EnvType = "development" | "production";

export const envType: EnvType =
  import.meta.env.VITE_ENV_TYPE === "development"
    ? "development"
    : "production";
export const isEnvDevelopment = envType === "development";
export const isEnvProduction = envType === "production";
