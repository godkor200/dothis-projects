import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
/**
 * Middleware for checking the health of Ignite database connections.
 */
@Injectable()
export class IgniteHealthCheckMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(
    IgniteHealthCheckMiddleware.name,
  );
  constructor(private igniteService: IgniteService) {}

  /**
   * Logs the current Ignite connection status for each request.
   */
  use(req: Request, res: Response, next: NextFunction) {
    const isConnected = this.igniteService.getDatabaseConnectionStatus();
    this.logger.log(`Ignite connection status: ${isConnected}`);
    next();
  }
}
