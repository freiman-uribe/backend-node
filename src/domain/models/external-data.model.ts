export interface ExternalData {
  id: string;
  symbol: string;
  name: string;
  priceUsd: number;
  marketCapRank: number | null;
  source: "coingecko";
  fetchedAt: string;
}

export interface RawCoinMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap_rank: number | null;
}
