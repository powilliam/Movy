import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  TypeOrmHealthIndicator,
  HealthCheck,
  HealthCheckResult,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private typeorm: TypeOrmHealthIndicator,
  ) {}

  @Get('database')
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return this.health.check([() => this.typeorm.pingCheck('database')]);
  }
}
