#!/bin/sh
cd ./dist
rm -rf build
cd ../src/popup
yarn build
cp -r ./build ../../dist
cd ../background
npx webpack
cd ../content
npx webpack