import { RequestContext } from 'nestjs-request-context';
export class AppRequestContext extends RequestContext {
  requestId: string;
  // transactionConnection?: DatabaseTransactionConnection; // For global transactions
}
export class RequestContextService {
  static getContext(): AppRequestContext {
    const ctx: AppRequestContext = RequestContext.currentContext.req;
    return ctx;
  }
  static setRequestId(id: string): void {
    const ctx = this.getContext();
    ctx.requestId = id;
  }

  static getRequestId(): string {
    return this.getContext().requestId;
  }
}
