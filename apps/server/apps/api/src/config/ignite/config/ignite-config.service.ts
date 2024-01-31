import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const IgniteClient = require('apache-ignite-client');
const IgniteClientConfiguration = IgniteClient.IgniteClientConfiguration;
@Injectable()
export class IgniteConfigService implements OnModuleInit, OnModuleDestroy {
  readonly client: any;

  constructor(private configService: ConfigService) {
    // Create a new Ignite client instance.
    this.client = new IgniteClient(this.onStateChanged);
  }

  // NestJS hook that is called after the module is initialized.
  async onModuleInit(): Promise<void> {
    try {
      const igniteClientConfiguration = new IgniteClientConfiguration(
        this.configService.get<string>('ignite.IGNITE_ENDPOINT'),
      )
        .setUserName(this.configService.get<string>('ignite.IGNITE_USER_NAME'))
        .setPassword(this.configService.get<string>('ignite.IGNITE_PASSWORD'));
      // Connect to Ignite server.
      await this.client.connect(igniteClientConfiguration);
      console.log('Successfully connected to Ignite server.');
    } catch (err) {
      console.error('Failed to connect to Ignite server:', err);
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

  // Ignite client state change handler.
  onStateChanged(state, reason) {
    if (state === IgniteClient.STATE.CONNECTED) {
      console.log('Client is started');
    } else if (state === IgniteClient.STATE.CONNECTING) {
      console.log('Client is connecting');
    } else if (state === IgniteClient.STATE.DISCONNECTED) {
      console.log('Client is stopped');
      if (reason) {
        console.log(reason);
      }
    }
  }

  // Other service methods...
}
