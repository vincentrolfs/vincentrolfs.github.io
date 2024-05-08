#!/usr/bin/fish

set dir (pwd)
konsole --new-tab --workdir="$dir/docs" -e "$SHELL -c \"python3 server.py\""
nohup vivaldi "http://localhost:8099" >/dev/null 2>&1 &
./scripts/watch.fish