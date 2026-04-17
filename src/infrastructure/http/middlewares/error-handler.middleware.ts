import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../domain/errors/app-error";

export function errorHandlerMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message
    });
    return;
  }

  res.status(500).json({
    message: "Error interno del servidor"
  });
}
