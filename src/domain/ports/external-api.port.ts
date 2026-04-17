import { RawCoinMarketData } from "../models/external-data.model";

export interface ExternalApiPort {
  fetchTopCoins(limit: number): Promise<RawCoinMarketData[]>;
}
