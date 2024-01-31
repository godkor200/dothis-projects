export class PutAgreePromotionDto {
  public readonly isAgree: boolean;
  public readonly id: number;

  constructor(props: PutAgreePromotionDto) {
    Object.assign(this, props);
  }
}
