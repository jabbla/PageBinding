#!/bin/sh
cd ./src/popup
yarn build
cp -r ./build ../../dist
cd ../background
npx webpack