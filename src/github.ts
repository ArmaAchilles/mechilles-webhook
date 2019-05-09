import axios, { AxiosResponse } from 'axios';

import IGitCommit from './interfaces';

export default class GitHub {
    private apiUrl = 'https://api.github.com';

    private owner: string;
    private repo: string;

    constructor(owner: string, repo: string) {
        this.owner = owner;
        this.repo = repo;
    }

    public getCommit(hash: string): Promise<IGitCommit> {
        return new Promise((resolve, reject) => {
            axios.get(`${this.apiUrl}/repos/${this.owner}/${this.repo}/commits/${hash}`)
            .then((commit: AxiosResponse<IGitCommit>) => resolve(commit.data))
            .catch(error => reject(error));
        });
    }
}
