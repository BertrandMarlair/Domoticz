#!/bin/bash

set -e

sudo docker-compose down
pm2 stop all
pm2 delete all