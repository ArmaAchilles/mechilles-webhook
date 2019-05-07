import * as dotenv from 'dotenv';
import IDriver from './driver';

dotenv.config();

export default class Environment {
    public static get driver(): IDriver {
        if (! process.env.DRIVER) {
            throw new Error('DRIVER is not defined in your .env file.');
        }

        const driver: IDriver = require(`./drivers/${process.env.DRIVER}`).default;

        return driver;
    }

    public static get<T extends string | number | boolean | undefined>(
        value: getValues, returnType: 'string' | 'number' | 'boolean' = 'string',
        canBeUndefined?: boolean): T {
            const valueUpper = value.toUpperCase();

            // tslint:disable-next-line: no-eval
            const computed: string | undefined = eval(`process.env.${valueUpper}`);

            if (computed) {
                if (returnType === 'string') {
                    return computed as T;
                } else if (returnType === 'number') {
                    return parseInt(computed, 10) as T;
                } else if (returnType === 'boolean') {
                    return (computed === 'true') as T;
                }
            } else if (canBeUndefined) {
                return undefined as T;
            }

            throw new Error(`${valueUpper} is not defined in your .env file.`);
    }
}

export interface IColors {
    error: string;
    ok: string;
}

export type getValues =
    'webhook_id' |
    'webhook_secret' |
    'driver';
