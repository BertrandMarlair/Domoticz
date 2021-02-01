#!/bin/bash

set -e

cd ../
cd MongoDomoticz && pm2 start "mongod -dbpath ./db --port 27019" && cd ..
cd MongoAuth && pm2 start "mongod -dbpath ./db --port 27018" && cd ..
cd Auth && pm2 start ecosystem.config.js && cd ..
cd Config && pm2 start ecosystem.config.js && cd ..
cd Gateway && pm2 start ecosystem.config.js && cd ..
cd Domoticz && pm2 start ecosystem.config.js && cd ..
cd Client && pm2 start ecosystem.config.js && cd ..
cd Setup