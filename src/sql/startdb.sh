#!/bin/bash

docker build -t post_ackee .
# CID=$(docker run -d post)
# docker inspect $CID
node ./createEnv.js