#!/bin/bash

set -e

docker-compose down
pm2 stop all
pm2 delete all