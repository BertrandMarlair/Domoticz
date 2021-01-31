#!/bin/bash

set -e

cd ../
cd Auth && npm run build && cd ..
cd Client && npm run build && cd ..
cd Config && npm run build && cd ..
cd Gateway && npm run build && cd ..
cd Domotics && npm run build && cd ..

sudo docker-compose -f docker-compose.build.yml build
sudo docker-compose -f docker-compose.build.yml push