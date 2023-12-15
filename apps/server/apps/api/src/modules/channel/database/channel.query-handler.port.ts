export interface ChannelQueryHandlerPort {
  findChannelName(channelId: string): Promise<string>;
}
