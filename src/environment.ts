import * as dotenv from 'dotenv';
import * as express from 'express';
import * as _ from 'lodash';
import IDriver from './driver';

dotenv.config();

export default class Environment {
    public static driver<T extends IDriver>(request: express.Request): T {
        let envDriver = '';
        let data = request.body;

        if (request.header('Travis-Repo-Slug')) {
            envDriver = 'travis';
            data = JSON.parse(data.payload);
        } else if (_.has(request.body, 'subscriptionId')) {
            envDriver = 'pipelines';
        } else {
            throw new Error('Failed to detect the driver to use.');
        }

        const driver: any = require(`./drivers/${envDriver}`).default;

        console.log(`Mechilles: Loaded driver ${envDriver}.`);

        return new driver(data);
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
