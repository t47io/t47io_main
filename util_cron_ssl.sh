#!/bin/sh
SSL_STATUS=$(cat /home/admin/t47io/main/data/sys_ssl.txt)

if [ "$SSL_STATUS" -eq 1 ]; then
    service nginx stop

    echo >> /home/admin/log_ssl.log
    echo "$(tput setab 2)$(date)$(tput sgr 0)" >> /home/admin/log_ssl.log
    /home/admin/letsencrypt/letsencrypt-auto renew >> /home/admin/log_ssl.log 2>&1
    LE_STATUS=$?
    echo >> /home/admin/log_ssl.log

    service nginx start

    if [ "$LE_STATUS" != 0 ]; then
        echo "$(tput setab 1)Automated renewal failed:$(tput sgr 0)"
        cat /home/admin/log_ssl.log
        exit 1
    fi
fi
