import axios, { AxiosInstance } from "axios";
import { AppError } from "../../domain/errors/app-error";
import { RawCoinMarketData } from "../../domain/models/external-data.model";
import { ExternalApiPort } from "../../domain/ports/external-api.port";

export class CoinGeckoClient implements ExternalApiPort {
  private readonly client: AxiosInstance;

  constructor(baseURL: string, timeoutMs: number) {
    this.client = axios.create({
      baseURL,
      timeout: timeoutMs
    });
  }

  async fetchTopCoins(limit: number): Promise<RawCoinMarketData[]> {
    try {
      const response = await this.client.get<RawCoinMarketData[]>("/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: limit,
          page: 1,
          sparkline: false
        }
      });

      if (!Array.isArray(response.data)) {
        throw new AppError("Respuesta invalida de CoinGecko", 502);
      }

      return response.data;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("No fue posible obtener datos externos", 502);
    }
  }
}
