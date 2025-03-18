import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      "Request:",
      req.method,
      `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    );
    console.log("Request:", req.ip);
    console.log("Fecha y hora:", new Date());
    next();
  }
}
