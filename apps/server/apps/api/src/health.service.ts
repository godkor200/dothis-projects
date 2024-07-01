import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHello(): string {
    return 'Hello dothis World! ver -0.0.2';
  }
}
