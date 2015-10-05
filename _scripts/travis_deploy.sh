#!/bin/bash

set -e # exit with nonzero exit code if anything fails

mkdir upload
cd upload

cp -R $TRAVIS_BUILD_DIR/_site/* .

git init

git config user.name "Travis CI Auto Deploy"
git config user.email "matthew@daviesgeek.com"

git add .
git commit -m "Deploy from Travis to GitHub Pages"

git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master > /dev/null 2>&1