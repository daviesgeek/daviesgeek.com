#!/bin/bash

DATE=`date +%Y-%m-%d`
TIMESTAMP=${DATE}' '`date +%T`
FILENAME=${1/ /-}
echo -e "---\nlayout: post\ndate:$TIMESTAMP\n---" >> _posts/$DATE-$FILENAME.md