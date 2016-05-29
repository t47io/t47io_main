from bs4 import BeautifulSoup
import re
import simplejson
import smtplib
import sys
import time
import traceback
import urllib


def send_notify_emails(msg_subject, msg_content):
    smtpserver = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
    smtpserver.starttls()
    smtpserver.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
    msg = 'Subject: %s\n\n%s' % (msg_subject, msg_content)
    smtpserver.sendmail(EMAIL_HOST_USER, [EMAIL_HOST_USER], msg)
    smtpserver.quit()


def filter_words(string, min_len, exclude=[]):
    str_list = [str(x.lower()) for x in re.findall("[a-zA-Z]+", string) if len(x) > min_len]
    return filter(lambda x: (x not in exclude), str_list)


try:
    r = urllib.urlopen('https://scholar.google.com/citations?user=HbNbD8AAAAAJ&hl=en').read()
    soup = BeautifulSoup(r, 'html5lib')
    all_records = []

    tbody = soup.find(id='gsc_a_b')
    for tr in tbody.find_all('tr'):
        title = tr.find('td', class_='gsc_a_t').find('a').getText().encode('ascii','ignore')
        author = tr.find('td', class_='gsc_a_t').find('div', class_='gs_gray').getText().encode('ascii','ignore')
        year = tr.find('span', class_='gsc_a_h').getText().encode('ascii','ignore')
        cite = tr.find('td', class_='gsc_a_c').find('a', class_='gsc_a_ac').getText().encode('ascii','ignore')

        if 'correction:' in title.lower() and not cite:
            continue

        title = filter_words(title, 4)
        author = filter_words(author, 2, ['and'])
        year = int(year) if year else None
        cite = int(cite) if cite else None
        all_records.append({'title': title, 'author': author, 'year': year, 'cite': cite})


    pub_json = simplejson.load(open('config/pub.json', 'r'))
    (pub_records, cite_records) = ({}, {})

    for key in pub_json.keys():
        cite_records[key] = []
        pub_records[key] = []

        for obj in pub_json[key]:
            title = filter_words(obj['title'], 4)
            author = filter_words(obj['author'], 2, ['and'])
            year = int(key.replace('-', ''))
            pub_records[key].append({'title': title, 'author': author, 'year': year})

            is_match = False
            for i, r in enumerate(all_records):
                is_title = all([x in r['title'] for x in title])
                is_author = all([x in author for x in r['author']]) if len(r['author']) <= 6 else all([x in r['author'] for x in author])
                is_match = is_title and is_author
                if is_match:
                    cite_records[key].append(r['cite'])
                    break

            if is_match:
                if len(all_records):
                    all_records.pop(i)
                else:
                    break
            else:
                cite_records[key].append(None)

    if len(all_records):
        for r in all_records:
            print '\033[93mWARNING\033[0m: record from Google Scholar was not matched: \033[94m%s (%s) %s\033[0m' % (' '.join(r['author']), r['year'], ' '.join(r['title']))

    for key in cite_records:
        if int(key.replace('-', '')) < 2016 and None in cite_records[key]:
            print '\033[41mERROR\033[0m: record before year 2016 appears wrong.'
            print cite_records
            sys.exit(1)


    dat_json = simplejson.load(open('config/dat.json', 'r'))
    dat_json['citations'] = cite_records
    simplejson.dump(dat_json, open('config/dat.json', 'w'), indent=' ' * 4, sort_keys=True)

except Exception:
    print('\033[41mERROR\033[0m: Failed to update Google Scholar citation.\n')
    err = traceback.format_exc()
    ts = '%s\n' % time.ctime()
    print('%s%s\n' % (ts, err))


print('\033[92mSUCCESS\033[0m: Google Scholar citation records updated.\n')

email_dict = {}
sum_cite = 0
for key in pub_json.keys():
    for i, obj in enumerate(pub_json[key]):
        num = cite_records[key][i]
        email_dict[obj['file']] = num
        if num is not None:
            sum_cite += num
email_dict['sum'] = sum_cite
msg = '%s\n%s\n' % (time.ctime(), simplejson.dumps(email_dict, indent=' ' * 4, sort_keys=True))

env_json = simplejson.load(open('config/env.json', 'r'))['email']
(EMAIL_HOST, EMAIL_PORT, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD) = (env_json['host'], int(env_json['port']), env_json['login'], env_json['password'])
send_notify_emails('[t47io] Google Scholar Citation Update', msg)
