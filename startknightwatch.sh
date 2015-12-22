#!/bin/bash

java -jar nightwatch/sel-serv.jar &> /dev/null &
SEL=$!;
echo $SEL
sleep 3
node nightwatch.js

kill $SEL
