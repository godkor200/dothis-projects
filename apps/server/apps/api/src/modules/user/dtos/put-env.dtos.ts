export class PutEnvDtos {
  public readonly id: number;
  public readonly isEnvLocal: boolean;

  constructor(props: PutEnvDtos) {
    this.id = props.id;
    this.isEnvLocal = props.isEnvLocal;
  }
}
