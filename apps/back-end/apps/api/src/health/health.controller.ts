import { Controller, Get } from '@nestjs/common';
import { HealthService } from '@Apps/api/src/health/health.service';

@Controller()
export class HeathApiController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHello(): string {
    return this.healthService.getHello();
  }
}
