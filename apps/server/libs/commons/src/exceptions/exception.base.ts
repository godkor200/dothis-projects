import { RequestContextService } from '@Libs/commons/src/application/context/AppRequestContext';

export interface SerializedException {
  message: string;
  code: string;
  correlationId: string;
  stack?: string;
  cause?: string;
  metadata?: unknown;
  /**
   * 어떤 예외(Exception)를 발생시킬 때 추가적인 정보를 담고 있는 metadata 객체를
   * 선택적으로 포함시키는 것을 제안하고 있습니다. 이는 언어 자체에서 이와 유사한 기능을 기본적으로 지원하지 않는 경우에 유용합니다.
   * 이러한 추가 정보는 예외가 발생했을 때 디버깅을 더욱 쉽게 만들어줍니다.
   */
}

/**
 * 기본 클래스 custom Exception
 *
 * @abstract
 * @class ExceptionBase
 * @extends {Error}
 */
export abstract class ExceptionBase extends Error {
  abstract code: string;

  public readonly correlationId: string;

  /**
   * @param {string} message
   * @param {ObjectLiteral} [metadata={}]
   * **BE CAREFUL**
   * 'metadata' 파라미터는 민감한 정보를 포함하지 않도록 주의해야 합니다. 이 파라미터에 저장된 모든 예외(exception)의 데이터는 애플리케이션의 로그 파일에 기록될 수 있으므로, 민감한 정보가 노출되는 것을 방지하기 위해 주의해야 합니다.
   * 'metadata' 파라미터에는 디버깅에 도움이 될 수 있는 민감하지 않은 정보만 포함해야 합니다.
   */
  constructor(
    readonly message: string,
    readonly cause?: Error,
    readonly metadata?: unknown,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    const ctx = RequestContextService.getContext();
    this.correlationId = ctx.requestId;
  }
  /**
   * By default in NodeJS Error objects are not
   * serialized properly when sending plain objects
   * to external processes. This method is a workaround.
   * Keep in mind not to return a stack trace to user when in production.
   * https://iaincollins.medium.com/error-handling-in-javascript-a6172ccdf9af
   */
  toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      correlationId: this.correlationId,
      cause: JSON.stringify(this.cause),
      metadata: this.metadata,
    };
  }
}
