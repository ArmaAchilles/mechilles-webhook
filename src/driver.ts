export default interface IDriver {
    driverName: string;
    driverImageUrl: string;

    embedColor: string;
    embedTitle: IEmbedTitle;
    embedBuildUrl: string;
    embedBuildComplete: Date;

    embedCommitSha: string;
    embedCommitName: string;

    commitAuthor: ICommitAuthor;
}

export interface ICommitAuthor {
    username: string;
    profileUrl: string;
    profileImageUrl: string;
}

export interface IEmbedTitle {
    repositoryName: string;
    branchName: string;
    buildNumber: number;
    buildStatus: EBuildStatus;
}

export enum EBuildStatus {
    pending = 15588927,
    passed = 3779158,
    fixed = 3779158,
    broken = 14370117,
    failed = 14370117,
    stillFailing = 14370117,
    canceled = 10329501,
}
