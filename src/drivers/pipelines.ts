import axios, { AxiosResponse } from 'axios';
import IDriver, { Driver, EBuildColors, EBuildStatus, ICommitAuthor, IEmbed } from '../driver';
import IPipelines, { IPipelinesResource } from '../driverInterfaces/pipelines';
import GitHub from '../github';

export default class Pipelines extends Driver implements IDriver {
    public driverName = 'Azure Pipelines';
    public driverImageUrl = 'https://i.imgur.com/2PJdoTK.png';

    public commitAuthor?: ICommitAuthor;
    public embed?: IEmbed;

    constructor(json: IPipelines) {
        super();

        axios.get(json.resource.url).then(async (resource: AxiosResponse<IPipelinesResource>) => {
            const data = resource.data;

            // Owner/Repo
            const repoId = data.repository.id.split('/');
            const commit = await new GitHub(repoId[0], repoId[1]).getCommit(data.sourceVersion);

            this.commitAuthor = {
                profileImageUrl: commit.author.avatar_url,
                profileUrl: commit.author.html_url,
                username: commit.author.login,
            };

            this.embed = {
                buildCompleteTimestamp: json.resource.finishTime,
                buildUrl: data._links.web.href,
                color: EBuildColors[json.resource.status],
                commitName: commit.commit.message,
                commitSha: commit.sha,
                commitUrl: commit.html_url,
                title: {
                    branchName: data.sourceBranch.split('/')[2],
                    buildNumber: json.resource.id,
                    buildStatus: EBuildStatus[json.resource.status],
                    repositoryName: repoId[1],
                },
            };

            this.emit('ready', this);
        });
    }
}
