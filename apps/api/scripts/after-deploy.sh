#!/bin/bash
REPOSITORY=/var/www/back-end

sudo chmod -R 777 $REPOSITORY

cd $REPOSITORY

sudo chmod -R 777 ./ && pnpm build:back-end

pnpm i

sudo pm2 reload ecosystem.config.js --env production --update-env
