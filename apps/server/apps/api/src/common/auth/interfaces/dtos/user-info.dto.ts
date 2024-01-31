import { ApiProperty } from '@nestjs/swagger';

export class UserInfoCommandDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly userEmail: string;
  @ApiProperty()
  readonly channelId: string;
  @ApiProperty()
  readonly tokenRefresh: string | null;
  @ApiProperty()
  readonly googleAccessToken: string;
  @ApiProperty()
  readonly googleRefreshToken: string;
  @ApiProperty()
  readonly dateSignIn: Date;

  constructor(props: UserInfoCommandDto) {
    this.id = props.id;
    this.userEmail = props.userEmail;
    this.channelId = props.channelId;
    this.tokenRefresh = props.tokenRefresh;
    this.googleAccessToken = props.googleAccessToken;
    this.googleRefreshToken = props.googleRefreshToken;
    this.dateSignIn = props.dateSignIn;
  }
}
