import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
  Scope,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const IgniteClient = require('apache-ignite-client');
const IgniteClientConfiguration = IgniteClient.IgniteClientConfiguration;
let count = 0;
const SqlFieldsQuery = IgniteClient.SqlFieldsQuery;
@Injectable({ scope: Scope.DEFAULT })
export class IgniteService implements OnModuleInit, OnModuleDestroy {
  public static client: typeof IgniteClient;
  private connectionState: 'connected' | 'disconnected' | 'error' =
    'disconnected';
  public readonly SqlFieldsQuery = IgniteClient.SqlFieldsQuery;
  private readonly logger: Logger = new Logger(IgniteService.name);

  constructor(private configService: ConfigService) {
    // Create a new Ignite client instance.
    if (!IgniteService.client) {
      // 클라이언트 인스턴스가 없을 때만 새로 생성
      IgniteService.client = new IgniteClient(this.onStateChanged.bind(this));
    }
  }
  public getClient(): typeof IgniteClient {
    return IgniteService.client;
  }

  // 추가된 헬스 체크 메서드
  private async healthCheck(): Promise<boolean> {
    try {
      // 예시 쿼리 실행을 통한 헬스 체크: 실제 사용 케이스에 따라 변경 가능
      const query = new SqlFieldsQuery('SELECT 1');
      const tableNames = await this.getClient().cacheNames();
      const cache = await this.getClient().getCache(tableNames[0]);
      const result = await cache.query(query);
      this.logger.log(`health Check: ${result.length !== 0}`);
      return result.length !== 0; // Checks for a non-empty result as an indication of a healthy connection
    } catch (error) {
      this.logger.error(
        `Failed to connect to Ignite health Check: ${error.message}`,
      );
      return false; // 쿼리 실행 중 오류가 발생하면 false 반환
    }
  }

  private async checkConnectionPeriodically(interval: number) {
    setInterval(async () => {
      const isHealthy = await this.healthCheck();

      if (!isHealthy) {
        this.logger.log('health Check failed, Attempting to reconnect....');
        await this.connectWithRetry(30000, 10);
      }
    }, interval);
  }

  public createDistributedJoinQuery(sqlQuery: string) {
    return new SqlFieldsQuery(sqlQuery)
      .setDistributedJoins(true)
      .setLazy(false);
  }
  private async connect() {
    const endpoint1 = this.configService.get<string>('ignite.IGNITE_ENDPOINT1');
    const username = this.configService.get<string>('ignite.IGNITE_USER_NAME');
    const password = this.configService.get<string>('ignite.IGNITE_PASSWORD');
    const igniteClientConfiguration = new IgniteClientConfiguration(endpoint1)
      .setUserName(username)
      .setPassword(password);
    // Ignite 서버에 연결 시도
    await this.getClient().connect(igniteClientConfiguration);
  }
  /*
   * ignite 재시도 로직
   */
  private async connectWithRetry(
    retryDelay: number,
    maxRetries: number,
  ): Promise<void> {
    let retries = 0;

    while (retries < maxRetries) {
      try {
        await this.connect();
        this.connectionState = 'connected';
        this.logger.log('Successfully connected to Ignite server.');
        break;
      } catch (err) {
        this.logger.error(`Failed to connect to Ignite server: ${err.message}`);
        retries++;
        this.logger.log(
          `Attempting to reconnect... (${retries}/${maxRetries})`,
        );
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }

    if (this.connectionState !== 'connected') {
      this.logger.error(
        'Max retries reached. Ignite client failed to connect.',
      );
    }
  }
  // NestJS hook that is called after the module is initialized.
  async onModuleInit(): Promise<void> {
    try {
      await this.connect();
    } catch (error) {
      console.error('초기 Ignite 연결 실패. 재시도 중...');
    } finally {
      await this.checkConnectionPeriodically(30000); // 30초 마다 헬크체크를 보냄
    }
  }

  // NestJS hook that is called before the module is destroyed.
  async onModuleDestroy(): Promise<void> {
    try {
      // Disconnect from Ignite server if connected.
      if (this.getClient() && this.connectionState === 'connected') {
        await this.getClient().disconnect();
        console.log('Disconnected from Ignite server.');
      }
    } catch (err) {
      console.error('Error during Ignite client disconnection:', err);
    }
  }

  private onStateChanged(state: number, reason?: string): void {
    switch (state) {
      case IgniteClient.STATE.CONNECTED:
        this.connectionState = 'connected';
        this.logger.log('Client is started');
        break;
      case IgniteClient.STATE.CONNECTING:
        this.logger.log('Client is connecting');
        break;
      case IgniteClient.STATE.DISCONNECTED:
        this.connectionState = 'disconnected';
        this.logger.log('Client is stopped');
        if (reason) {
          this.logger.log(reason);
        }
        break;
      default:
        this.connectionState = 'error';
    }
  }
  /**
   * Returns the database connection status.
   * @returns A string representing the connection status: 'Connected', 'Connecting', 'Disconnected', or 'Unknown'
   */
  public getDatabaseConnectionStatus(): string {
    return this.connectionState;
  }
}
