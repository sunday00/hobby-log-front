pnpm build
cp -r .next/static .next/standalone/.next/
-r public .next/standalone/
rsync -az .next/standalone sunday00@211.184.119.6:/volume1/web/hobby-log/frontend/html/

echo "
  docker exec -it hobby-log-front /bin/bash
  kill node then run PORT=3021 node standalone/server.js on docker container
"