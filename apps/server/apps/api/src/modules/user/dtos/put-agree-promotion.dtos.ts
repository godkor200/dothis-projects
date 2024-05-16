export class PutAgreePromotionDto {
  public readonly isAgree: boolean;
  public readonly id: number;
  public readonly channelId: string;

  constructor(props: PutAgreePromotionDto) {
    Object.assign(this, props);
  }
}
