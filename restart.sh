ps -ef | grep "next-server" | grep -v grep | awk '{print $1}' | xargs kill -9 1 > /dev/null

if [ $? -eq 0 ]; then
    echo "some-application Stop Success"
  else
    echo "some-application Not Running"
fi

echo "some-application Restart!"

PORT=3021 nohup node standalone/server.js &

