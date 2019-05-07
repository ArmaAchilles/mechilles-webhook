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
    pending,
    passed,
    fixed,
    broken,
    failed,
    stillFailing,
    canceled,
}
