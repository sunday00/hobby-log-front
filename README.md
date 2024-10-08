## restart

```shell
# in container

inotifywait -e create -m ./deploy-time/ -t 0 |
while read -r events; do
    ./restart.sh
done &

```