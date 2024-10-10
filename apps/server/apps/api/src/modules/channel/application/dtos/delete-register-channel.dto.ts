export class DeleteChannelDto {
  readonly channelId: string;
  readonly userId: number;

  constructor(params: { channelId: string; userId: number }) {
    this.channelId = params.channelId;
    this.userId = params.userId;
  }
}
