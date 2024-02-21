import { IsString, Matches, MaxLength } from 'class-validator';

export class FindRelRequestDto {
  @MaxLength(50)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  readonly keyword: string;
}
