#!/bin/bash

set -e

cd ../
cd MongoAuth && pm2 start "mongod -dbpath ./db --port 27018" && cd ..
cd MongoDomoticz && pm2 start "mongod -dbpath ./db --port 27019" && cd ..
pm2 start "redis-server start"
cd Auth/dist && pm2 start api.bundle.js && cd ../..
cd Config/dist && pm2 start api.bundle.js && cd ../..
cd Gateway/dist && pm2 start api.bundle.js && cd ../..
cd Domoticz/dist && pm2 start api.bundle.js && cd ../..
cd Client && pm2 serve build -s -l 3000 --spa && cd ..
cd Setup