import * as discord from 'discord.js';
import IDriver, { EBuildStatus } from './driver';
import Environment from './environment';
import String from './string';

export default class Discord {
    private hook: discord.WebhookClient;

    constructor() {
        this.hook = new discord.WebhookClient(Environment.get('webhook_id'), Environment.get('webhook_secret'));
    }

    public generateEmbed(build: IDriver): discord.RichEmbed | undefined {
        if (! build.commitAuthor || ! build.embed) { return; }

        const buildStatus = String.toSentenceCase(EBuildStatus[build.embed.title.buildStatus]);
        const gitHash = String.shorten(build.embed.commitSha, 7);
        const repoInfo = `[${build.embed.title.repositoryName}:${build.embed.title.branchName}]`;

        return new discord.RichEmbed({
            author: {
                icon_url: build.commitAuthor.profileImageUrl,
                name: build.commitAuthor.username,
                url: build.commitAuthor.profileUrl,
            },
            color: build.embed.color,
            description: `[${gitHash}](${build.embed.commitUrl}) ${build.embed.commitName}`,
            timestamp: build.embed.buildCompleteTimestamp,
            title: `${repoInfo} Build #${build.embed.title.buildNumber} ${buildStatus}`,
            url: build.embed.buildUrl,
        });
    }

    public postMessage(embed: discord.RichEmbed, username: string, avatarURL: string) {
        return this.hook.send({ avatarURL, embeds: [embed], username });
    }
}
