#!/bin/bash
REPOSITORY=/var/www/back-end

cd $REPOSITORY

sudo chmod -R 777 ./

pnpm i

pnpm build:back-end:prod

cd /var/www/back-end/apps/server/apps/api

sudo pm2 reload ecosystem.config.js --env production --update-env
