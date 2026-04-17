import { ExternalData, RawCoinMarketData } from "../../domain/models/external-data.model";

export class ExternalDataService {
  transform(items: RawCoinMarketData[]): ExternalData[] {
    const fetchedAt = new Date().toISOString();

    return items.map((item) => ({
      id: item.id,
      symbol: item.symbol.toUpperCase(),
      name: item.name,
      priceUsd: Number(item.current_price.toFixed(2)),
      marketCapRank: item.market_cap_rank,
      source: "coingecko",
      fetchedAt
    }));
  }
}
