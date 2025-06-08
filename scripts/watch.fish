#!/usr/bin/env fish

node -v

function run
    phantom phantom/ docs/
end

run
fswatch -o phantom/ | while read f
    run
end
