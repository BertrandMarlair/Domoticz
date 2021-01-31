#!/bin/bash

set -e

cd ../
cd Auth && npm run build && cd ..
cd Client && npm run build && cd ..
cd Config && npm run build && cd ..
cd Gateway && npm run build && cd ..
cd Domoticz && npm run build && cd ..