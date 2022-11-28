#!/bin/bash
REPOSITORY=/var/www/back-end

sudo chmod -R 777 $REPOSITORY

cd $REPOSITORY

sudo pm2 reload ./ecosystem.config.js --only dothis-dev
