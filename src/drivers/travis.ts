import IDriver, { Driver, EBuildStatus, ICommitAuthor, IEmbed } from '../driver';
import ITravis from '../driverInterfaces/travis';
import GitHub from '../github';

export default class Travis extends Driver implements IDriver {
    public driverName = 'Travis CI';
    public driverImageUrl = 'https://i.imgur.com/kOfUGNS.png';

    public commitAuthor?: ICommitAuthor;
    public embed?: IEmbed;

    constructor(json: ITravis) {
        super();

        new GitHub(json.repository.owner_name, json.repository.name).getCommit(json.commit)
        .then(commit => {
            this.commitAuthor = {
                profileImageUrl: commit.author.avatar_url,
                profileUrl: commit.author.html_url,
                username: commit.author.login,
            };

            this.embed = {
                buildCompleteTimestamp: json.finished_at,
                buildUrl: json.build_url,
                color: EBuildStatus[json.state],
                commitName: json.message,
                commitSha: json.commit,
                commitUrl: json.compare_url,
                title: {
                    branchName: json.branch,
                    buildNumber: parseInt(json.number, 10),
                    buildStatus: EBuildStatus[json.state],
                    repositoryName: json.repository.owner_name,
                },
            };

            this.emit('ready', this);
        });
    }
}
