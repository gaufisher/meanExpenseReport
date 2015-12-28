#!/bin/bash

java -jar nightwatch/sel-serv.jar &> /dev/null &
SEL=$!;
echo $SEL
sleep 5
node nightwatch.js

kill $SEL
