import { UserInfoCommandDto } from '@Apps/common/auth/commands/v1/google-login-redirect/google-login-redirect.service';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import {
  zPostStoryBoardPathParams,
  zPostStoryBoardMainParams,
  zPostStoryBoardBody,
  TPostStoryBoardBody,
  zStoryBoardId,
  zPostStoryBoardBodyBoolean,
} from '@dothis/dto';

/**
 * FIXME: 이렇게 다 정의 할 필요 없을텐데..
 */
export class RecentStoryBoardCreateDto implements UserInfoCommandDto {
  readonly id: number;
  readonly channelId: string;
  readonly dateSignIn: Date;
  readonly googleAccessToken: string;
  readonly googleRefreshToken: string;
  readonly tokenRefresh: string | null;
  readonly userEmail: string;
  constructor(props: RecentStoryBoardCreateDto) {
    Object.assign(this, props);
  }
}
export class PostStoryBoardPathParams extends createZodDto(
  extendApi(zPostStoryBoardPathParams),
) {}

export class PostStoryBoardMainParams extends createZodDto(
  extendApi(zPostStoryBoardMainParams),
) {
  constructor(props: PostStoryBoardMainParams) {
    super();
  }
}

export class PostStoryBoardMainDto extends PostStoryBoardMainParams {
  readonly body: TPostStoryBoardBody;
  constructor(props: PostStoryBoardMainDto) {
    super(props);
    Object.assign(this, props);
  }
}
export class PostStoryBoardBody extends createZodDto(
  extendApi(zPostStoryBoardBody),
) {}

export class PostStoryBoardBodyBoolean extends createZodDto(
  extendApi(zPostStoryBoardBodyBoolean),
) {}

export class PostStoryBoardMainDraftDto extends PostStoryBoardMainParams {
  readonly body: TPostStoryBoardBody;
  constructor(props: PostStoryBoardMainDraftDto) {
    super(props);
    Object.assign(this, props);
  }
}

export class getStoryBoardDto extends createZodDto(extendApi(zStoryBoardId)) {
  constructor(props: getStoryBoardDto) {
    super();
    this.storyBoardId = props.storyBoardId;
  }
}
