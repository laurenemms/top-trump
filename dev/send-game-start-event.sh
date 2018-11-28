#!/usr/bin/env bash
cd $(dirname "$0")
http POST localhost:4321/dev/data?player=Player1 < ./game-start-event.json
