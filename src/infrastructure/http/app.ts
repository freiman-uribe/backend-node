import express from "express";
import { buildExternalDataModule } from "./modules/external-data.module";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";

export function createApp() {
  const app = express();
  const externalDataModule = buildExternalDataModule();

  app.use(express.json());
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });
  app.use(externalDataModule.router);
  app.use(errorHandlerMiddleware);

  return app;
}
