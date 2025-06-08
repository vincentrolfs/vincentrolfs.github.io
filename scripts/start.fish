#!/usr/bin/env fish

set dir (pwd)
echo "Starting..."
osascript -e "tell application \"Terminal\" to do script \"cd $dir/docs; python3 server.py\""
open http://localhost:8099
./scripts/watch.fish