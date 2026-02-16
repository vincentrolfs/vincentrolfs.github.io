#!/usr/bin/env fish

node -v

function run
    npm run phantom
end

run
fswatch -o phantom/ | while read f
    run
end
