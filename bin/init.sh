#!/bin/sh
logPath="/home/xudong/zxd/wx_node/logs/"
logFile="/home/xudong/zxd/wx_node/logs/console.log"
if [ ! -d "$logPath" ]; then
	mkdir "$logPath"
fi

if [ ! -f "$logFile" ]; then
	touch "$logFile"
fi