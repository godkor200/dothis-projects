import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/modules/user/constrants/user.di-token';
import { UserRepositoryPort } from '@Apps/modules/user/v1/db/user.repository.port';
import { JwtService } from '@nestjs/jwt';

export class TokenDto {
  accessToken: string;
  refreshToken: string;
  google_access_token: string;
  google_refresh_token: string;

  constructor(props: TokenDto) {
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
    this.google_access_token = props.google_access_token;
    this.google_refresh_token = props.google_refresh_token;
  }
}

@CommandHandler(TokenDto)
export class VerifyTokenCommandHandler implements ICommandHandler<TokenDto> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,

    private readonly jwtService: JwtService,
  ) {}
  async execute(command: TokenDto) {
    const access: any = this.jwtService.decode(
      command.accessToken.split('Bearer ')[1],
    );
    const refresh = this.jwtService.decode(command.refreshToken);
    const user = await this.userRepository.findOneById(access.id);
    if (!access || user.tokenRefresh !== command.refreshToken || !refresh)
      throw new HttpException('Invalid Credential', HttpStatus.UNAUTHORIZED);
    else {
      const newRefreshToken = this.jwtService.sign({ id: access.id });
      await this.userRepository.updateRefreshToken(access.id, newRefreshToken);
      return {
        accessToken: this.jwtService.sign(
          {
            id: access.id,
            userEmail: access.userEmail,
          },
          {
            expiresIn: '15m',
          },
        ),
        refreshToken: newRefreshToken,
      };
    }
  }
}
