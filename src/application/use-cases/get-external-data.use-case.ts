import { AppError } from "../../domain/errors/app-error";
import { ExternalData } from "../../domain/models/external-data.model";
import { ExternalApiPort } from "../../domain/ports/external-api.port";
import { ExternalDataRepositoryPort } from "../../domain/ports/external-data-repository.port";
import { ExternalDataService } from "../services/external-data.service";

export class GetExternalDataUseCase {
  constructor(
    private readonly externalApi: ExternalApiPort,
    private readonly externalDataService: ExternalDataService,
    private readonly repository: ExternalDataRepositoryPort
  ) {}

  async execute(limit: number): Promise<ExternalData[]> {
    if (limit <= 0 || limit > 50) {
      throw new AppError("El parametro limit debe estar entre 1 y 50", 400);
    }

    const externalItems = await this.externalApi.fetchTopCoins(limit);
    const transformed = this.externalDataService.transform(externalItems);

    await this.repository.saveMany(transformed);

    return transformed;
  }
}
