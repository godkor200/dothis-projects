export class PutEnvDtos {
  public readonly id: string;
  public readonly isEnvLocal: boolean;

  constructor(props: PutEnvDtos) {
    this.id = props.id;
    this.isEnvLocal = props.isEnvLocal;
  }
}
