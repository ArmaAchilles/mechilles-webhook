import * as dotenv from 'dotenv';
import { Request } from 'express';
import * as _ from 'lodash';
import IDriver from './driver';
import IPipelines from './driverInterfaces/pipelines';
import ITravis from './driverInterfaces/travis';

dotenv.config();

export default class Environment {
    public static driver<T extends ITravis | IPipelines | IDriver>(request: Request): T {
        const json = request.body;
        let envDriver = 'travis';

        if (request.header('Travis-Repo-Slug')) {
            envDriver = 'travis';
        } else if (_.has(json, 'subscriptionId')) {
            envDriver = 'pipelines';
        }

        const driver: any = require(`./drivers/${envDriver}`).default;

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
