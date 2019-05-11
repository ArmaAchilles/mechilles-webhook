import * as express from 'express';

import Discord from './discord';
import IDriver, { EBuildStatus } from './driver';
import Environment from './environment';
import Message from './message';

const app = express();

app.use(express.json());

app.post('/', (request, response) => {
    const discord = new Discord();
    const configDriver = Environment.driver<IDriver>(request);

    configDriver.on('ready', (driver: IDriver) => {
        const embed = discord.generateEmbed(driver);

        console.log('Mechilles: Got request.');

        if (driver.embed) {
            const status = driver.embed.title.buildStatus;

            if (Message.isSuccessfulBuild(status) && Message.get().lastMessageWasSuccessful) {
                response.status(200).send('OK');
                console.log('Mechilles: Ignoring request as it is successful.');

                return;
            }

            if (Message.isFailedBuild(status)) {
                Message.set('lastMessageWasSuccessful', false);
            }
        }

        if (embed) {
            discord.postMessage(embed, driver.driverName, driver.driverImageUrl).then(() => {
                response.status(201).send('Created');
                console.log('Mechilles: Build message sent.');
            }).catch(error => {
                console.error('Mechilles: Failed to post message to server.');
                console.error(error);

                response.status(500).send('Internal Server Error');
            });
        } else {
            console.log('Mechilles: Bad request.');
            response.status(400).send('Bad Request');
        }
    });
});

app.listen(Environment.get('port', 'number'), () => console.log(`Mechilles is listening!`));
