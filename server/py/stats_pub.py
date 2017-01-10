from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import os
import re
import simplejson
import smtplib
import subprocess
import sys
import time
import traceback
import urllib


def send_notify_emails(msg_subject, msg_content):
    smtpserver = smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT)
    # smtpserver.starttls()
    smtpserver.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
    msg = 'Subject: %s\n\n%s' % (msg_subject, msg_content)
    smtpserver.sendmail(EMAIL_HOST_USER, [EMAIL_HOST_USER], msg)
    smtpserver.quit()


subprocess.check_call('echo | openssl s_client -connect t47.io:443 | openssl x509 -noout -enddate > %s' % os.path.join(MEDIA_ROOT, 'data/temp.txt'), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
exp_date = subprocess.Popen('sed %s %s' % ("'s/^notAfter\=//g'", os.path.join(MEDIA_ROOT, 'data/temp.txt')), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
exp_date = datetime.strptime(exp_date.replace('notAfter=', ''), "%b %d %H:%M:%S %Y %Z")
f = open(os.path.join(MEDIA_ROOT, 'data/sys_ssl.txt'), 'w')
f.write('%d' % int(datetime.today() >= exp_date - timedelta(days=15)))
f.close()


if not env_json['DEBUG']:
    email_dict = {}
    sum_cite = 0
    for key in pub_json.keys():
        for i, obj in enumerate(pub_json[key]):
            num = cite_records[key][i]
            email_dict[obj['file']] = num
            if num is not None:
                sum_cite += num
    email_dict['sum'] = sum_cite
    msg = '%s\n%s\n\nSSL Certificate: %s\n' % (time.ctime(), simplejson.dumps(email_dict, indent=' ' * 4, sort_keys=True), exp_date.strftime('%Y-%m-%d %H:%M:%S'))

    env_email = env_json['email']
    (EMAIL_HOST, EMAIL_PORT, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD) = (env_email['host'], int(env_email['port']), env_email['login'], env_email['password'])
    send_notify_emails('[t47io] Google Scholar Citation Update', msg)
