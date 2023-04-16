import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetChannelDataCommandDto {
  @ApiProperty({ description: '유저 고유 인덱스' })
  userId: string;

  @IsNotEmpty({ message: '토큰이 필요합니다.' })
  @ApiProperty({ description: '구글 사이트 access token' })
  accessToken: string;

  @ApiProperty({ description: '유저 고유 이메일 아이디' })
  userEmail: string;
  constructor(props: GetChannelDataCommandDto) {
    this.userId = props.userId;
    this.accessToken = props.accessToken;
    this.userEmail = props.userEmail;
  }
}
