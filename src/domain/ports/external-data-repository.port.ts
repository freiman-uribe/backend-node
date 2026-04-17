import { ExternalData } from "../models/external-data.model";

export interface ExternalDataRepositoryPort {
  saveMany(items: ExternalData[]): Promise<void>;
}
