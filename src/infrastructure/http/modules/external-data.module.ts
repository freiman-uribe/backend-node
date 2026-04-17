import { ExternalDataService } from "../../../application/services/external-data.service";
import { GetExternalDataUseCase } from "../../../application/use-cases/get-external-data.use-case";
import { env } from "../../../config/env";
import { CoinGeckoClient } from "../../external/coingecko.client";
import { TypeOrmExternalDataRepository } from "../../persistence/typeorm/repositories/typeorm-external-data.repository";
import { ExternalDataController } from "../controllers/external-data.controller";
import { createExternalDataRouter } from "../routes/external-data.routes";

export function buildExternalDataModule() {
  const externalApiClient = new CoinGeckoClient(env.externalApiUrl, env.externalApiTimeoutMs);
  const service = new ExternalDataService();
  const repository = new TypeOrmExternalDataRepository();
  const useCase = new GetExternalDataUseCase(externalApiClient, service, repository);
  const controller = new ExternalDataController(useCase);

  return {
    router: createExternalDataRouter(controller)
  };
}
