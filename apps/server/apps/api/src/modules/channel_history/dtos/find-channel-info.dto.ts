export class FindChannelInfoDto {
  readonly channelId: string;

  constructor(props: FindChannelInfoDto) {
    this.channelId = props.channelId;
  }
}
