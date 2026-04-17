import { env } from "./config/env";
import { createApp } from "./infrastructure/http/app";

async function bootstrap(): Promise<void> {
  const app = createApp();
  app.listen(env.port, () => {
    process.stdout.write(`Backend API corriendo en puerto ${env.port}\n`);
  });
}

bootstrap().catch((error) => {
  process.stderr.write(`Error al iniciar la aplicacion: ${String(error)}\n`);
  process.exit(1);
});
