#!/usr/bin/env bash
cd $(dirname "$0")
http POST localhost:4321/dev/data?player=Player1 < ./result-event.json