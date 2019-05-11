import * as express from 'express';

import Discord from './discord';
import IDriver, { Driver } from './driver';
import Environment from './environment';
import Messages from './messages';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (request, response) => {
    console.log('Mechilles: Got request.');

    const discord = new Discord();
    const configDriver = Environment.driver<IDriver>(request);

    configDriver.on('ready', (driver: IDriver) => {
        const embed = discord.generateEmbed(driver);

        if (driver.embed) {
            const status = driver.embed.title.buildStatus;
            const repoBranch = `${driver.embed.title.repositoryName}/${driver.embed.title.branchName}`;

            const messages = Messages.get().find(element => element.repoBranch === repoBranch);

            if (messages) {
                const message = messages.message;

                if (message) {
                    if (message.wasSuccessful && Driver.isSuccessfulBuild(status)) {
                        response.status(200).send('OK');
                        console.log('Mechilles: Build status is successful, not showing message.');

                        return;
                    } else if (Driver.isFailedBuild(status)) {
                        Messages.append(repoBranch, { wasSuccessful: false });
                    } else if (! message.wasSuccessful && Driver.isSuccessfulBuild(status)) {
                        Messages.append(repoBranch, { wasSuccessful: true });
                    }
                } else {
                    Messages.append(repoBranch, { wasSuccessful: Driver.isSuccessfulBuild(status) });
                }
            } else {
                Messages.append(repoBranch, { wasSuccessful: Driver.isSuccessfulBuild(status) });
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
