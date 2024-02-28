import { MessageBuilder, Webhook } from 'minimal-discord-webhook-node';
import * as process from 'process';

export const sendWebhook = (embed: MessageBuilder) => {
  const hook = new Webhook(process.env.DISCORD_WEBHOOK);
  hook.send(embed);
};
