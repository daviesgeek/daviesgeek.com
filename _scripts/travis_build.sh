#!/bin/bash

if [[ $TRAVIS_BRANCH == 'master' ]] ; then
  export JEKYLL_ENV=production
  bundle exec rake stage
else
  echo 'Invalid branch. You can only deploy from master and live.'
  exit 1
fi
