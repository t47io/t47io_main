import gviz_api
from github import Github
import operator
import pytz
import requests
import simplejson
import time

org = 't47io'
repo_name = 'SpindleUtil'
access_token = ''


gh = Github(login_or_token=access_token)
TIME_ZONE = 'America/Los_Angeles'

name = org + '/' + repo_name
repo = gh.get_repo(name)
created_at = repo.created_at.replace(tzinfo=pytz.utc).astimezone(pytz.timezone(TIME_ZONE)).strftime('%Y-%m-%d %H:%M:%S')
pushed_at = repo.pushed_at.replace(tzinfo=pytz.utc).astimezone(pytz.timezone(TIME_ZONE)).strftime('%Y-%m-%d %H:%M:%S')

num_issues = len(requests.get('https://api.github.com/repos/' + name + '/issues?access_token=%s' % access_token).json())
num_pulls = len(requests.get('https://api.github.com/repos/' + name + '/pulls?access_token=%s' % access_token).json())
num_watchers = len(requests.get('https://api.github.com/repos/' + name + '/watchers?access_token=%s' % access_token).json())
num_branches = len(requests.get('https://api.github.com/repos/' + name + '/branches?access_token=%s' % access_token).json())
num_forks = len(requests.get('https://api.github.com/repos/' + name + '/forks?access_token=%s' % access_token).json())
num_downloads = len(requests.get('https://api.github.com/repos/' + name + '/downloads?access_token=%s' % access_token).json())

contribs = repo.get_stats_contributors()
i = 0
while (contribs is None and i <= 5):
    time.sleep(1)
    contribs = repo.get_stats_contributors()
    i += 1
if contribs is None: raise Exception("PyGithub failed")
data = []
for contrib in contribs:
    a, d = (0, 0)
    for w in contrib.weeks:
        a += w.a
        d += w.d
    if contrib.author:
        au = contrib.author.login
    else:
        au = '(None)'
    data.append({u'Contributors': au, u'Commits': contrib.total, u'Additions': a, u'Deletions': d})

data = sorted(data, key=operator.itemgetter(u'Commits'), reverse=True)[0:4]
open('_n.json', 'w').write(simplejson.dumps({'created_at':created_at, 'pushed_at':pushed_at, 'num_watchers':num_watchers, 'num_pulls':num_pulls, 'num_issues':num_issues, 'num_branches':num_branches, 'num_forks':num_forks, 'num_downloads':num_downloads, 'url':repo.html_url, 'private':repo.private, 'data':data, 'name':repo.name, 'id':repo.full_name}, sort_keys=True, indent=' ' * 4))


for qs in ['c', 'ad']:
    data = []
    desp = {'Timestamp':('datetime', 'Timestamp'), 'Samples':('number', 'Samples'), 'Unit':('string', 'Count')}
    stats = ['Timestamp']

    if qs == 'c':
        i = 0
        contribs = repo.get_stats_commit_activity()
        while (contribs is None and i <= 5):
            time.sleep(1)
            contribs = repo.get_stats_commit_activity()
            i += 1
        if contribs is None: raise Exception("PyGithub failed")
        fields = ['Commits']
        for contrib in contribs: 
            data.append({u'Timestamp': contrib.week, u'Commits': sum(contrib.days)})
    elif qs == 'ad':
        i = 0
        contribs = repo.get_stats_code_frequency()
        while (contribs is None and i <= 5):
            time.sleep(1)
            contribs = repo.get_stats_code_frequency()
            i += 1
        if contribs is None: raise Exception("PyGithub failed")
        fields = ['Additions', 'Deletions']
        for contrib in contribs:
            data.append({u'Timestamp': contrib.week, u'Additions': contrib.additions, u'Deletions': contrib.deletions})

    for field in fields:
        stats.append(field)
        desp[field] = ('number', field)
    
    data = sorted(data, key=operator.itemgetter(stats[0]))
    data_table = gviz_api.DataTable(desp)
    data_table.LoadData(data)
    open('_' + qs + '.json', 'w').write(data_table.ToJSonResponse(columns_order=stats, order_by='Timestamp', req_id='__REQ_ID__'))

