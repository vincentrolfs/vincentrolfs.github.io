#!/usr/bin/fish

phantom phantom/ docs/
inotifywait -m -r -e modify,create,delete,moved_to,moved_from phantom/ |
    while read dir event file; phantom phantom/ docs/;
end