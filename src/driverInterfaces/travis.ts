export interface IRepository {
    id: number;
    name: string;
    owner_name: string;
    url?: string;
}

export default interface ITravis {
    id: number;
    number: string;
    type: string;
    state: 'pending' | 'passed' | 'fixed' | 'broken' | 'failed' | 'stillFailing' | 'canceled';
    status: number;
    result: number;
    status_message: string;
    result_message: string;
    started_at: Date;
    finished_at: Date;
    duration: number;
    build_url: string;
    commit_id: number;
    commit: string;
    base_commit?: string;
    head_commit?: string;
    branch: string;
    message: string;
    compare_url: string;
    committed_at: Date;
    author_name: string;
    author_email: string;
    committer_name: string;
    committer_email: string;
    pull_request: boolean;
    pull_request_number?: number;
    pull_request_title?: string;
    tag?: string[];
    repository?: IRepository;
}
