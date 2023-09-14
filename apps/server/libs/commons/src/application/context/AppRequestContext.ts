import { RequestContext } from 'nestjs-request-context';
import { EntityManager } from 'typeorm';

/**
 * Setting some isolated context for each request.
 */

export class AppRequestContext extends RequestContext {
  requestId: string;
  transactionConnection?: EntityManager; // For global transactions
}

export class RequestContextService {
  static getContext(): AppRequestContext {
    return RequestContext.currentContext.req;
  }

  static setRequestId(id: string): void {
    const ctx = this.getContext();
    ctx.requestId = id;
  }

  static getRequestId(): string {
    return this.getContext().requestId;
  }

  static getTransactionConnection(): EntityManager | undefined {
    const ctx = this.getContext();
    return ctx.transactionConnection;
  }

  static setTransactionConnection(transactionConnection?: EntityManager): void {
    const ctx = this.getContext();
    ctx.transactionConnection = transactionConnection;
  }

  static cleanTransactionConnection(): void {
    const ctx = this.getContext();
    ctx.transactionConnection = undefined;
  }
}
