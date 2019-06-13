#!/bin/sh
cd ./src/app
yarn build
cp -r ./build ../../dist