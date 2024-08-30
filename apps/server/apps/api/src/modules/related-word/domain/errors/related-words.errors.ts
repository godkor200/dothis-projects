import { ExceptionBase } from '@Libs/commons';

export class RelatedWordsNotFoundError extends ExceptionBase {
  static readonly message = 'The related words could not be found.';

  public readonly code = 'RELATED_WORDS.NOT_FOUND';

  constructor(metadata?: unknown) {
    super(RelatedWordsNotFoundError.message, undefined, metadata);
  }
}
export class RelatedClusterNotFoundError extends ExceptionBase {
  static readonly message = 'The related cluster could not be found.';

  public readonly code = 'RELATED_CLUSTER.NOT_FOUND';

  constructor(metadata?: unknown) {
    super(RelatedClusterNotFoundError.message, undefined, metadata);
  }
}

export class ExternalAiServerError extends ExceptionBase {
  static readonly message = 'The external AI server is unavailable.';

  public readonly code = 'EXTERNAL_AI_SERVER.ERROR';

  constructor(metadata?: unknown) {
    super(ExternalAiServerError.message, undefined, metadata);
  }
}
