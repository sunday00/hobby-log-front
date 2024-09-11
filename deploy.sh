pnpm build
cp -r .next/static .next/standalone/.next/
-r public .next/standalone/
rsync -az .next/standalone sunday00@211.184.119.6:/volume1/web/hobby-log/frontend/html/

echo "
  docker exec -it hobby-log-front /bin/bash

  ps then found pid
  kill -9 {pid}
  PORT=3021 nohup node standalone/server.js &
"