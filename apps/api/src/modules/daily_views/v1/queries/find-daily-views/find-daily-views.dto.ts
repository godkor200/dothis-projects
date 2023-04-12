import { IsString, Matches, MaxLength } from 'class-validator';

export class FindDailyViewsRequestDto {
  @MaxLength(50)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  readonly relationKeyword: string;
}

export class FindDailyViewsRequestQuery {
  from: string;

  to: string;
}
