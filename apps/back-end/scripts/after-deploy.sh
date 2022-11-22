#!/bin/bash
REPOSITORY=/var/www/back-end

cd $REPOSITORY

sudo npm install

sudo pm2 start dist
