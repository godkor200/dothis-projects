import { IsDate, IsString, Matches, MaxLength } from 'class-validator';

export class FindDailyViewsRequestDto {
  @MaxLength(50)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  readonly relationKeyword: string;
}

export class FindDailyViewsRequestQuery {
  @IsDate({ message: 'not Date' })
  from: Date;
  @IsDate({ message: 'not Date' })
  to: Date;
}
