export class PutAgreePromotionDtos {
  isAgree: boolean;
  id: bigint;

  constructor(props: PutAgreePromotionDtos) {
    this.isAgree = props.isAgree;
    this.id = props.id;
  }
}
