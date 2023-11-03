export class PutAgreePromotionDtos {
  public readonly isAgree: boolean;
  public readonly id: string;

  constructor(props: PutAgreePromotionDtos) {
    this.isAgree = props.isAgree;
    this.id = props.id;
  }
}
