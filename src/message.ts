import * as fs from 'fs';
import * as path from 'path';

import { EBuildStatus } from './driver';

export default class Message {
    public static isFailedBuild(build: EBuildStatus): boolean {
        if (EBuildStatus.pending) { return false; }

        return ! this.isSuccessfulBuild(build);
    }

    public static isSuccessfulBuild(build: EBuildStatus): boolean {
        return (EBuildStatus.passed === build || EBuildStatus.fixed === build);
    }

    public static get(): IMessage {
        const messagePath = path.join(__dirname, '../', 'message.json');

        if (fs.existsSync(messagePath)) {
            return JSON.parse(fs.readFileSync(messagePath, 'utf8'));
        }

        return {};
    }

    public static set(key: keyof IMessage, value: boolean | undefined) {
        const message = this.get();

        message[key] = value;

        fs.writeFileSync(path.join(__dirname, '../', 'message.json'), JSON.stringify(message, undefined, 4));
    }
}

export interface IMessage {
    lastMessageWasSuccessful?: boolean;
}
