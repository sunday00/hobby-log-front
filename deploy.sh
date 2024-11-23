pnpm build
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/

echo 'rsync to main folder'
rsync -az .next/standalone sunday00@211.184.116.232:/volume1/web/hobby-log/frontend/html/

echo 'rsync for restart'
touch deploy.time && date > deploy.time && rsync -az deploy.time sunday00@211.184.116.232:/volume1/web/hobby-log/frontend/html/deploy-time/

rm -rf deploy.time
echo "
  docker exec -it hobby-log-front /bin/bash

  # exec:
  ./restart.sh
"