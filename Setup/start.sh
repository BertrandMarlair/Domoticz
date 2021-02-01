#!/bin/bash

set -e

docker-compose up --build -d
cd ../
cd Auth && pm2 start ecosystem.config.js && cd ..
cd Config && pm2 start ecosystem.config.js && cd ..
cd Gateway && pm2 start ecosystem.config.js && cd ..
cd Domoticz && pm2 start ecosystem.config.js && cd ..
cd Client && pm2 start ecosystem.config.js && cd ..
cd Setup