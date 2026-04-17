import { Request, Response, NextFunction } from "express";
import { env } from "../../../config/env";
import { GetExternalDataUseCase } from "../../../application/use-cases/get-external-data.use-case";

export class ExternalDataController {
  constructor(private readonly getExternalDataUseCase: GetExternalDataUseCase) {}

  async getExternalData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limitRaw = req.query.limit;
      const limit = typeof limitRaw === "string" ? Number(limitRaw) : env.externalDataLimit;
      const finalLimit = Number.isFinite(limit) ? limit : env.externalDataLimit;

      const result = await this.getExternalDataUseCase.execute(finalLimit);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
