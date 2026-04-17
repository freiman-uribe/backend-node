import { Repository } from "typeorm";
import { ExternalData } from "../../../../domain/models/external-data.model";
import { ExternalDataRepositoryPort } from "../../../../domain/ports/external-data-repository.port";
import { appDataSource } from "../data-source";
import { ExternalDataOrmEntity } from "../entities/external-data.entity";

export class TypeOrmExternalDataRepository implements ExternalDataRepositoryPort {
  private readonly repository: Repository<ExternalDataOrmEntity>;

  constructor() {
    this.repository = appDataSource.getRepository(ExternalDataOrmEntity);
  }

  async saveMany(items: ExternalData[]): Promise<void> {
    for (const item of items) {
      const existing = await this.repository.findOne({ where: { id: item.id } });

      if (existing) {
        existing.symbol = item.symbol;
        existing.name = item.name;
        existing.priceUsd = item.priceUsd;
        existing.marketCapRank = item.marketCapRank;
        existing.source = item.source;
        existing.fetchedAt = item.fetchedAt;
        await this.repository.save(existing);
        continue;
      }

      const record = this.repository.create({
        id: item.id,
        symbol: item.symbol,
        name: item.name,
        priceUsd: item.priceUsd,
        marketCapRank: item.marketCapRank,
        source: item.source,
        fetchedAt: item.fetchedAt
      });

      await this.repository.save(record);
    }
  }
}
