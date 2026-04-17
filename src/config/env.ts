import dotenv from "dotenv";

dotenv.config();

function toNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const env = {
  port: toNumber(process.env.PORT, 3000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  externalApiUrl: process.env.EXTERNAL_API_URL ?? "https://api.coingecko.com/api/v3",
  externalApiTimeoutMs: toNumber(process.env.EXTERNAL_API_TIMEOUT_MS, 8000),
  externalDataLimit: toNumber(process.env.EXTERNAL_DATA_LIMIT, 5),
  sqlitePath: process.env.SQLITE_PATH ?? "./db/backend-node.sqlite",
  azureStorageAccountName: process.env.AZURE_STORAGE_ACCOUNT_NAME ?? "",
  azureStorageContainer: process.env.AZURE_STORAGE_CONTAINER ?? "",
  azureStorageSasToken: process.env.AZURE_STORAGE_SAS_TOKEN ?? ""
};
