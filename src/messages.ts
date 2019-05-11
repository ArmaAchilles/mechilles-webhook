import * as fs from 'fs';
import * as path from 'path';

export default class Messages {
    public static get(): IMessages[] {
        const messagePath = path.join(__dirname, '../', 'message.json');

        if (fs.existsSync(messagePath)) {
            const json: IMessages[] = JSON.parse(fs.readFileSync(messagePath, 'utf8'));

            // Sort latest to oldest
            json.sort((a, b) => (b.created > a.created) ? 1 : (a.created > b.created) ? -1 : 0);

            return json;
        }

        return [];
    }

    public static append(key: string, value: IMessage) {
        const messages = this.get();

        messages.push({ created: new Date(), repoBranch: key, message: value });

        this.write(messages);
    }

    private static write(data: any) {
        fs.writeFileSync(path.join(__dirname, '../', 'message.json'), JSON.stringify(data, undefined, 4));
    }
}

export interface IMessages {
    created: Date;
    repoBranch: string;
    message: IMessage;
}

export interface IMessage {
    wasSuccessful: boolean;
}
