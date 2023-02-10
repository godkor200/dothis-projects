import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/api/src/user/user.di-token';
import { UserRepositoryPort } from '@Apps/api/src/user/v1/db/user.repository.port';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { JwtService } from '@nestjs/jwt';
import { ApiProperty } from '@nestjs/swagger';
export class UserInfoCommandDto {
  @ApiProperty()
  readonly id: bigint;
  @ApiProperty()
  readonly userEmail: string;
  @ApiProperty()
  readonly tokenRefresh: string | null;
  @ApiProperty()
  readonly goolgleAccessToken: string;
  @ApiProperty()
  readonly goolgleRefreshToken: string;
  constructor(props: UserInfoCommandDto) {
    this.id = props.id;
    this.userEmail = props.userEmail;
    this.tokenRefresh = props.tokenRefresh;
    this.goolgleAccessToken = props.goolgleAccessToken;
    this.goolgleRefreshToken = props.goolgleRefreshToken;
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

  async execute(command: UserInfoCommandDto) {
    let checkUser = await this.userRepository.findOneByEmail(command.userEmail);

    if (!checkUser) {
      const user = User.create(command);

      await this.userRepository.transaction(
        async () => await this.userRepository.insert(user),
      );
      checkUser = await this.userRepository.findOneByEmail(command.userEmail);
    }

    const refreshToken = this.jwtService.sign({
      id: checkUser.id,
    });

    await this.userRepository.updateRefreshToken(checkUser.id, refreshToken);

    return {
      accessToken: this.jwtService.sign(
        {
          id: checkUser.id,
          userEmail: checkUser.userEmail,
        },
        {
          expiresIn: '15m',
        },
      ),
      refreshToken,
    };
  }
}
