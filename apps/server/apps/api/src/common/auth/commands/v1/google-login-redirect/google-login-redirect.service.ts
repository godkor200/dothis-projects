import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { JwtService } from '@nestjs/jwt';
import { User } from '@Apps/modules/user/domain/user.entity';
import { GoogleLoginRedirectRes } from '@Apps/common/auth/interfaces/google-login-redirect.interface';
import { Err, Ok, Result } from 'oxide.ts';
import { InternalServerErrorException } from '@Libs/commons';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';

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
    const googleAccessToken = command.googleAccessToken;
    const googleRefreshToken = command.googleRefreshToken;
    await this.userRepository.updateRefreshToken(checkUser.id, refreshToken);

    return Ok({
      accessToken: this.jwtService.sign(
        {
          id: checkUser.id,
          channelId: checkUser.channelId,
          userEmail: checkUser.userEmail,
          isAdmin: checkUser.isAdmin,
          isEnvLocal: checkUser.isEnvLocal,
        },
        { expiresIn: '1h' },
      ),
      refreshToken,
      isNewUser,
      isEnvLocal: checkUser.isEnvLocal,
      googleAccessToken,
      googleRefreshToken,
    });
  }
}
