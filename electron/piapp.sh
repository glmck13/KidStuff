#!/bin/bash

cd ~/.config/piapp/Cache/Cache_Data; rm -fr *
cd ~/opt/piapp
~/bin/antimicrox --hidden &
npm run start >/dev/null 2>&1 &
