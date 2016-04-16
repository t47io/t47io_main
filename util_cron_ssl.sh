#!/bin/sh
service nginx stop

/home/admin/letsencrypt/letsencrypt-auto renew > /home/admin/log_ssl.log 2>&1
LE_STATUS=$?

if [ "$LE_STATUS" != 0 ]; then
    echo Automated renewal failed:
    cat /home/admin/log_ssl.log
    exit 1
fi

service nginx start
