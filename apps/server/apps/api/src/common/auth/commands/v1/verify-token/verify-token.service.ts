import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  HttpException,
  HttpStatus,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { JwtService } from '@nestjs/jwt';
import { Err, Ok } from 'oxide.ts';
import { UnauthorizedExceptionError } from '@Apps/common/auth/domain/event/auth.error';

export class TokenDto {
  userInfo: IUserInfo;
  refreshToken: string;
  google_access_token: string;
  google_refresh_token: string;

  constructor(props: TokenDto) {
    this.userInfo = props.userInfo;
    this.refreshToken = props.refreshToken;
    this.google_access_token = props.google_access_token;
    this.google_refresh_token = props.google_refresh_token;
  }
}
export interface IUserInfo {
  id: number;
  channelId: string;
  userEmail: string;
  iat: number;
  exp: number;
}

@CommandHandler(TokenDto)
export class VerifyTokenCommandHandler implements ICommandHandler<TokenDto> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,

    private readonly jwtService: JwtService,
  ) {}

  /**
   * 경우의 수
   * 1. 엑세스 토큰이 만료 되어서 refeshToken 만 유효할때
   * 2. 둘다 유효한 경우
   * 3. 둘다 만료된 경우 => 재로그인 필요
   * @param command
   */
  async execute(command: TokenDto) {
    console.log(command);
    const userEntity = await this.userRepository.findOneById(
      command.userInfo.id.toString(),
    );

    if (
      userEntity.tokenRefresh !== command.refreshToken ||
      !userEntity.tokenRefresh
    ) {
      return Err(new UnauthorizedExceptionError());
    } else {
      const newRefreshToken = this.jwtService.sign(
        { id: userEntity.id },
        { expiresIn: '24h' },
      );
      await this.userRepository.updateRefreshToken(
        Number(userEntity.id),
        newRefreshToken,
      );
      return Ok({
        accessToken: this.jwtService.sign(
          {
            id: userEntity.id,
            userEmail: userEntity.userEmail,
            channelId: userEntity.channelId,
          },
          { expiresIn: '1h' },
        ),
        refreshToken: newRefreshToken,
      });
    }
  }
}
