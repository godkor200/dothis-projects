import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const IgniteClient = require('apache-ignite-client');
const IgniteClientConfiguration = IgniteClient.IgniteClientConfiguration;
@Injectable()
export class IgniteService implements OnModuleInit, OnModuleDestroy {
  readonly client: typeof IgniteClient;
  protected readonly logger: Logger = new Logger(IgniteService.name);

  constructor(private configService: ConfigService) {
    // Create a new Ignite client instance.
    this.client = new IgniteClient(this.onStateChanged.bind(this));
  }

  // NestJS hook that is called after the module is initialized.
  async onModuleInit(): Promise<void> {
    try {
      const endpoint = this.configService.get<string>('ignite.IGNITE_ENDPOINT');
      const username = this.configService.get<string>(
        'ignite.IGNITE_USER_NAME',
      );
      const password = this.configService.get<string>('ignite.IGNITE_PASSWORD');
      const igniteClientConfiguration = new IgniteClientConfiguration(endpoint)
        .setUserName(username)
        .setPassword(password);
      // Connect to Ignite server.
      await this.client.connect(igniteClientConfiguration);
      this.logger.log('Successfully connected to Ignite server.');
    } catch (err) {
      this.logger.error('Failed to connect to Ignite server:', err);
      throw err; // Rethrow the error to handle it elsewhere if needed.
    }
  }

  // NestJS hook that is called before the module is destroyed.
  async onModuleDestroy(): Promise<void> {
    try {
      // Disconnect from Ignite server if connected.
      if (this.client) {
        await this.client.disconnect();
        console.log('Disconnected from Ignite server.');
      }
    } catch (err) {
      console.error('Error during Ignite client disconnection:', err);
    }
  }

  private onStateChanged = (state: number, reason?: string): void => {
    switch (state) {
      case IgniteClient.STATE.CONNECTED:
        this.logger.log('Client is started');
        break;
      case IgniteClient.STATE.CONNECTING:
        this.logger.log('Client is connecting');
        break;
      case IgniteClient.STATE.DISCONNECTED:
        this.logger.log('Client is stopped');
        if (reason) {
          this.logger.log(reason);
        }
        break;
    }
  };

  // Other service methods...
}
