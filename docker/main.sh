#!/usr/bin/env sh

echo '* main - preparing app envionment'

# Comment out any step if you don't need them.

echo '** Set alpine registry'
sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

echo '** Install alpine dependencies'
# Install python, since some packages require it when running `npm ci`.
apk --no-cache add --virtual builds-deps build-base python mariadb-client

echo '** Set npm registry'
npm config set registry "https://registry.npm.taobao.org"

# echo '** Install global node package'
# npm i -g typescript ts-node

echo '** Install app dependencies'
npm ci --only=production
