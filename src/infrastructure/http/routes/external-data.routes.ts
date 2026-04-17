import { Router } from "express";
import { ExternalDataController } from "../controllers/external-data.controller";

export function createExternalDataRouter(controller: ExternalDataController): Router {
  const router = Router();

  router.get("/external-data", (req, res, next) => {
    void controller.getExternalData(req, res, next);
  });

  return router;
}
