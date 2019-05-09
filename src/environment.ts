import * as dotenv from 'dotenv';
import IDriver, { Driver } from './driver';
import IPipelines from './driverInterfaces/pipelines';
import ITravis from './driverInterfaces/travis';

dotenv.config();

export default class Environment {
    public static driver<T extends ITravis | IPipelines | IDriver>(json: any): T {
        if (! process.env.DRIVER) {
            throw new Error('DRIVER is not defined in your .env file.');
        }

        const driver: any = require(`./drivers/${process.env.DRIVER}`).default;

        return new driver(json);
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

export type getValues =
    'webhook_id' |
    'webhook_secret' |
    'driver' |
    'port';
