import gviz_api
from github import Github
import operator
import pytz
import requests
import simplejson
import time


repos = (('daslab', 'Daslab/Server_DasLab'), ('hitrace', 'hitrace/hitrace'), ('nathermo', 'Daslab/Primerize'), ('primerize', 'Daslab/Server_Primerize'), ('rdatkit', 'hitrace/RDATKit'), ('rmdb', 'Daslab/Server_RMDB'), ('spindle', 't47io/SpindleUtil'))

access_token = simplejson.load(open('config/env.json', 'r'))['git_token']
gh = Github(login_or_token=access_token)
TIME_ZONE = 'America/Los_Angeles'


for (tag, name) in repos:
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
        au = contrib.author.login if contrib.author else '(None)'
        data.append({u'Contributors': au, u'Commits': contrib.total, u'Additions': a, u'Deletions': d})

    data = sorted(data, key=operator.itemgetter(u'Commits'), reverse=True)[0:4]
    json = {'created_at': created_at, 'pushed_at': pushed_at, 'num_watchers': num_watchers, 'num_pulls': num_pulls, 'num_issues': num_issues, 'num_branches': num_branches, 'num_forks': num_forks, 'num_downloads': num_downloads, 'url': repo.html_url, 'private': repo.private, 'data': data, 'name': repo.name, 'nick_name': tag, 'id': repo.full_name}
    simplejson.dump(json, open('data/%s_n.json' % tag, 'w'), sort_keys=True, indent=' ' * 4)


    for qs in ['c', 'a']:
        data = []
        desp = {'Timestamp': ('datetime', 'Timestamp'), 'Samples': ('number', 'Samples'), 'Unit': ('string', 'Count')}
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
        elif qs == 'a':
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

        json = simplejson.loads(data_table.ToJSon(columns_order=stats, order_by='Timestamp'))
        simplejson.dump(json, open('data/%s_%s.json' % (tag, qs), 'w'), sort_keys=True)

