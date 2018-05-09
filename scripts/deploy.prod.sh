#! /bin/bash

if [ ! -f ./package.json ]; then
    echo "package.json is not found"
fi

rm -rf build
rm -rf node_modules
npm install
npm run build
cp ./favicons/* ./build/
aws s3 sync ./build s3://reachaf.com/
aws s3 sync ./build s3://www.reachaf.com/

