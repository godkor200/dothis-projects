import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { JwtService } from '@nestjs/jwt';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@Apps/modules/user/domain/user.entity';
import { GoogleLoginRedirectRes } from '@Apps/common/auth/interface/google-login-redirect.interface';
import { Err, Ok, Result } from 'oxide.ts';
import { InternalServerErrorException } from '@Libs/commons/src/exceptions/exceptions';
export class UserInfoCommandDto {
  @ApiProperty()
  readonly id: bigint;
  @ApiProperty()
  readonly userEmail: string;
  @ApiProperty()
  readonly tokenRefresh: string | null;
  @ApiProperty()
  readonly googleAccessToken: string;
  @ApiProperty()
  readonly googleRefreshToken: string;
  constructor(props: UserInfoCommandDto) {
    this.id = props.id;
    this.userEmail = props.userEmail;
    this.tokenRefresh = props.tokenRefresh;
    this.googleAccessToken = props.googleAccessToken;
    this.googleRefreshToken = props.googleRefreshToken;
  }
}
@CommandHandler(UserInfoCommandDto)
export class GoogleLoginRedirectCommandHandler
  implements ICommandHandler<UserInfoCommandDto>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    command: UserInfoCommandDto,
  ): Promise<Result<GoogleLoginRedirectRes, InternalServerErrorException>> {
    let isNewUser: boolean = false;
    let checkUser = await this.userRepository.findOneByEmail(command.userEmail);

    if (!checkUser) {
      const user = User.create(command);

      await this.userRepository.transaction(
        async () => await this.userRepository.insert(user),
      );
      checkUser = await this.userRepository.findOneByEmail(command.userEmail);
      isNewUser = true;
    }
    if (!checkUser) return Err(new InternalServerErrorException());
    const refreshToken = this.jwtService.sign(
      {
        id: checkUser.id,
      },
      { expiresIn: '24h' },
    );

    await this.userRepository.updateRefreshToken(checkUser.id, refreshToken);

    return Ok({
      accessToken: this.jwtService.sign(
        {
          id: checkUser.id,
          channelId: checkUser.channelId,
          userEmail: checkUser.userEmail,
        },
        { expiresIn: '1h' },
      ),
      refreshToken,
      isNewUser,
    });
  }
}
