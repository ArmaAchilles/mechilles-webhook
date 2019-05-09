import * as events from 'events';

export default interface IDriver {
    driverName: string;
    driverImageUrl: string;

    embed?: IEmbed;

    commitAuthor?: ICommitAuthor;

    on(event: 'ready', listener: (driver: this) => void): this;
}

export class Driver extends events.EventEmitter implements IDriver {
    public driverName = '';
    public driverImageUrl = '';
    public embed?: IEmbed | undefined;
    public commitAuthor?: ICommitAuthor | undefined;

    constructor() {
        super();
    }
}

export interface ICommitAuthor {
    username: string;
    profileUrl?: string;
    profileImageUrl?: string;
}

export interface IEmbedTitle {
    repositoryName: string;
    branchName: string;
    buildNumber: number;
    buildStatus: EBuildStatus;
}

export interface IEmbed {
    color: number;
    title: IEmbedTitle;
    buildUrl: string;
    buildCompleteTimestamp: Date;

    commitName: string;
    commitSha: string;
    commitUrl: string;
}

// Contains the embed color as value
export enum EBuildStatus {
    pending = 15588927,
    passed = 3779158,
    succeeded = passed,
    fixed = 3779158,
    broken = 14370116,
    failed = 14370117,
    stillFailing = 14370118,
    canceled = 10329501,
}
