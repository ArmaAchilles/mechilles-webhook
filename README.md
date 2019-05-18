# Mechilles Webhook
> Discord webhook that delivers messages about Travis CI or Azure Pipelines builds with support for other drivers.

## Requirements
- Node >= 10.15.3
- NPM >= 6.4.1


## Setup
- Get the code
- `npm install`
- `cp .env.example .env`
- Configure the `.env` file
- `npm run build`
- **Linux only** If you want `pm2` support
  - `python3 setupPm2.py`
  - `pm2 list`
  - `pm2 start pm2.config.js`
  - Good to go! Don't run `npm start`.
- `npm start`
- Good to go!
