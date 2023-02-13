#!/bin/bash
REPOSITORY=/var/www/back-end

sudo chmod -R 777 $REPOSITORY

cd $REPOSITORY

pnpm build

sudo pm2 reload ecosystem.config.js --env production --update-env
