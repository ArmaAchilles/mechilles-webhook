/**
 * Main webhook entry point
 */

export interface IMessage {
    text: string;
    html: string;
    markdown: string;
}

export interface IDetailedMessage {
    text: string;
    html: string;
    markdown: string;
}

export interface IDrop {
    location: string;
    type: string;
    url: string;
    downloadUrl: string;
}

export interface ILog {
    type: string;
    url: string;
    downloadUrl: string;
}

export interface ILastChangedBy {
    id: string;
    displayName: string;
    uniqueName: string;
    url: string;
    imageUrl: string;
}

export interface IDefinition {
    batchSize: number;
    triggerType: string;
    definitionType: string;
    id: number;
    name: string;
    url: string;
}

export interface IQueue {
    queueType: string;
    id: number;
    name: string;
    url: string;
}

export interface IRequestedFor {
    id: string;
    displayName: string;
    uniqueName: string;
    url: string;
    imageUrl: string;
}

export interface IRequest {
    id: number;
    url: string;
    requestedFor: IRequestedFor;
}

export interface IResource {
    uri: string;
    id: number;
    buildNumber: string;
    url: string;
    startTime: Date;
    finishTime: Date;
    reason: string;
    status: 'succeeded' | 'failed';
    dropLocation: string;
    drop: IDrop;
    log: ILog;
    sourceGetVersion: string;
    lastChangedBy: ILastChangedBy;
    retainIndefinitely: boolean;
    hasDiagnostics: boolean;
    definition: IDefinition;
    queue: IQueue;
    requests: Request[];
}

export interface ICollection {
    id: string;
}

export interface IAccount {
    id: string;
}

export interface IProject {
    id: string;
}

export interface IResourceContainers {
    collection: ICollection;
    account: IAccount;
    project: IProject;
}

export default interface IPipelines {
    id: string;
    eventType: string;
    publisherId: string;
    scope: string;
    message?: IMessage;
    detailedMessage?: IDetailedMessage;
    resource: IResource;
    resourceVersion: string;
    resourceContainers: IResourceContainers;
    createdDate: Date;
}

/**
 * Resource URL API
 */

// tslint:disable: interface-name

export interface Self {
    href: string;
}

export interface Web {
    href: string;
}

export interface SourceVersionDisplayUri {
    href: string;
}

export interface Timeline {
    href: string;
}

export interface Badge {
    href: string;
}

export interface Links {
    self: Self;
    web: Web;
    sourceVersionDisplayUri: SourceVersionDisplayUri;
    timeline: Timeline;
    badge: Badge;
}

export interface Plan {
    planId: string;
}

export interface Project {
    id: string;
    name: string;
    url: string;
    state: string;
    revision: number;
    visibility: string;
    lastUpdateTime: Date;
}

export interface Definition {
    drafts: any[];
    id: number;
    name: string;
    url: string;
    uri: string;
    path: string;
    type: string;
    queueStatus: string;
    revision: number;
    project: Project;
}

export interface Project2 {
    id: string;
    name: string;
    url: string;
    state: string;
    revision: number;
    visibility: string;
    lastUpdateTime: Date;
}

export interface Avatar {
    href: string;
}

export interface Links2 {
    avatar: Avatar;
}

export interface RequestedFor {
    displayName: string;
    url: string;
    _links: Links2;
    id: string;
    uniqueName?: any;
    imageUrl?: any;
    descriptor: string;
}

export interface Avatar2 {
    href: string;
}

export interface Links3 {
    avatar: Avatar2;
}

export interface RequestedBy {
    displayName: string;
    url: string;
    _links: Links3;
    id: string;
    uniqueName?: any;
    imageUrl?: any;
    descriptor: string;
}

export interface Avatar3 {
    href: string;
}

export interface Links4 {
    avatar: Avatar3;
}

export interface LastChangedBy {
    displayName: string;
    url: string;
    _links: Links4;
    id: string;
    uniqueName?: any;
    imageUrl?: any;
    descriptor: string;
}

export interface OrchestrationPlan {
    planId: string;
}

export interface Logs {
    id: number;
    type: string;
    url: string;
}

export interface Repository {
    id: string;
    type: string;
    clean?: any;
    checkoutSubmodules: boolean;
}

export interface IPipelinesResource {
    _links: Links;
    properties: object;
    tags: any[];
    validationResults: any[];
    plans: Plan[];
    triggerInfo: object;
    id: number;
    buildNumber: string;
    status: string;
    result: 'succeeded' | 'failed';
    queueTime: Date;
    startTime: Date;
    finishTime: Date;
    url: string;
    definition: Definition;
    buildNumberRevision: number;
    project: Project2;
    uri: string;
    sourceBranch: string;
    sourceVersion: string;
    priority: string;
    reason: string;
    requestedFor: RequestedFor;
    requestedBy: RequestedBy;
    lastChangedDate: Date;
    lastChangedBy: LastChangedBy;
    orchestrationPlan: OrchestrationPlan;
    logs: Logs;
    repository: Repository;
    keepForever: boolean;
    retainedByRelease: boolean;
    triggeredByBuild?: any;
}
