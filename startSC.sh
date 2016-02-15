#!/bin/bash
gnome-terminal -e "bash -c \"cd server; node chatserver.js; exec bash\""
gnome-terminal -e "bash -c \"cd client/src/; python -m http.server 8000; exec bash\""
