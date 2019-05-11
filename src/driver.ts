import * as events from 'events';

export default interface IDriver {
    driverName: string;
    driverImageUrl: string;

    embed?: IEmbed;

    commitAuthor?: ICommitAuthor;

    on(event: 'ready', listener: (driver: this) => void): this;
}

export class Driver extends events.EventEmitter implements IDriver {
    public static isFailedBuild(build: EBuildStatus): boolean {
        if (EBuildStatus.pending === build) { return false; }

        return ! this.isSuccessfulBuild(build);
    }

    public static isSuccessfulBuild(build: EBuildStatus): boolean {
        return (EBuildStatus.passed === build || EBuildStatus.fixed === build);
    }

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
    color: EBuildColors;
    title: IEmbedTitle;
    buildUrl: string;
    buildCompleteTimestamp: Date;

    commitName: string;
    commitSha: string;
    commitUrl: string;
}

export enum EBuildStatus {
    broken,
    canceled,
    failed,
    fixed,
    passed,
    pending,
    stillFailing,
    /** Azure Pipelines version (is equal to `passed`) */
    succeeded = passed,
}

export enum EBuildColors {
    broken = 14370117,
    canceled = 10329501,
    failed = 14370117,
    fixed = 3779158,
    passed = 3779158,
    pending = 15588927,
    stillFailing = 14370117,
    /** Azure Pipelines version (is equal to `passed`) */
    succeeded = passed,
}
