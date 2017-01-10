from bs4 import BeautifulSoup
import simplejson
import time
import traceback
import urllib

env_json = simplejson.load(open('server/config/env.json', 'r'))
colors = ['#eeeeee', '#d6e685', '#8cc665', '#44a340', '#1e6823']


try:
    r = urllib.urlopen(env_json['links']['github']).read()
    soup = BeautifulSoup(r, 'html5lib')
    git_svg = soup.find(class_='js-calendar-graph-svg')
    git_svg.attrs['height'] = 150
    del git_svg.attrs['class']

    dom_append = BeautifulSoup('<text x="0" y="120" ># Includes contributions from <tspan style="font-style:italic;">private</tspan> repositories</text>\n' + '<g transform="translate(572, 108)" id="legend">\n' + '<rect class="day day_0" x="0" />\n' + '<rect class="day day_1" x="13" />\n' + '<rect class="day day_2" x="26" />\n' + '<rect class="day day_3" x="39" />\n' + '<rect class="day day_4" x="52" />\n' + '</g>\n' + '<text x="534" y="118" class="legend">Less</text>\n' + '<text x="646" y="118" class="legend">More</text>\n', 'html.parser')
    git_svg.find('g').append(dom_append)

    list_rect = soup.find_all("rect", class_="day")
    for rect in list_rect:
        rect.attrs['class'] = 'day day_%s' % (colors.index(rect.attrs['fill']))
        if rect.attrs['fill'] != colors[0]:
            rect.attrs['data-for'] = 'STATS__tooltip'
            rect.attrs['data-tip'] = rect.attrs['data-count'] + ' contribution(s) on ' + rect.attrs['data-date']
        del rect.attrs['height'], rect.attrs['width'], rect.attrs['fill'], rect.attrs['data-count'], rect.attrs['data-date']

    open('public/data/git_contrib_%s.svg' % time.strftime('%Y%m%d', time.localtime()), 'w').write(str(git_svg))
    print('\033[92mSUCCESS\033[0m: GitHub contribution records updated.\n')

except Exception:
    print('\033[41mERROR\033[0m: Failed to update GitHub contribution.\n')
    err = traceback.format_exc()
    ts = '%s\n' % time.ctime()
    print('%s%s\n' % (ts, err))

