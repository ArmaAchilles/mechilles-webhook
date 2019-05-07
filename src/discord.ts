import * as discord from 'discord.js';
import Environment from './environment';

export default class Discord {
    private hook: discord.WebhookClient;

    constructor() {
        this.hook = new discord.WebhookClient(Environment.get('webhook_id'), Environment.get('webhook_secret'));
    }

    public postMessage(embed: discord.RichEmbed): Promise<discord.Message | discord.Message[]> {
        return this.hook.send({ embed });
    }
}
