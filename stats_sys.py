import os
import re
import simplejson
import subprocess
import sys
import time


d = time.strftime('%Y%m%d')  # datetime.datetime.now().strftime('%Y%m%d')
t0 = time.time()
MEDIA_ROOT = os.getcwd()
ver = {}
print("Checking system versions...")

# line 1
ver['ubuntu'] = subprocess.Popen("lsb_release -a | head -3 | tail -1 | sed 's/.*Ubuntu //g' | sed 's/ .*//g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['linux'] = subprocess.Popen("uname -r | sed 's/[a-z\-]//g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['coreutils'] = subprocess.Popen("tty --version | head -1 | sed 's/.*) //g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['screen'] = subprocess.Popen("screen --version | sed 's/.*version//g' | sed 's/(.*//g' | sed 's/[a-z ]//g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['bash'] = subprocess.Popen("bash --version | head -1 | sed 's/.*version//g' | sed 's/-release.*//g' | sed 's/[ ()]//g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
open(os.path.join(MEDIA_ROOT, 'data/temp.txt'), 'w').write(subprocess.Popen('ssh -V', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip())
ver['ssh'] = subprocess.Popen("sed 's/^OpenSSH\_//g' %s | sed 's/U.*//' | sed 's/,.*//g' | sed 's/[a-z]/./g'" % os.path.join(MEDIA_ROOT, 'data/temp.txt'), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
print("\033[92mSUCCESS\033[0m: line \033[94m1\033[0m"),

# line 2
ver['curl'] = subprocess.Popen("curl --version | head -1 | sed 's/.*curl //g' | sed 's/ (.*//g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['wget'] = subprocess.Popen("wget --version | head -1 | sed 's/.*Wget//g' | sed 's/built.*//g' | sed 's/ //g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['tar'] = subprocess.Popen("tar --version | head -1 | sed 's/.*)//g' | sed 's/-.*//g' | sed 's/ //g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['pandoc'] = subprocess.Popen("pandoc --version | head -1 | sed 's/.*pandoc //g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['imagemagick'] = subprocess.Popen("mogrify -version | head -1 | sed 's/\-.*//g' | sed 's/.*ImageMagick //g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['nano'] = subprocess.Popen("nano --version | head -1 | sed 's/.*version //g' | sed 's/(.*//g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
print(", \033[94m2\033[0m"),

# line 3
ver['python'] = '%s.%s.%s' % (sys.version_info.major, sys.version_info.minor, sys.version_info.micro)
open(os.path.join(MEDIA_ROOT, 'data/temp.txt'), 'w').write(subprocess.Popen('javac -version', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip())
ver['java'] = subprocess.Popen("sed 's/.*javac//g' %s | sed 's/_/./g'" % os.path.join(MEDIA_ROOT, 'data/temp.txt'), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['ruby'] = subprocess.Popen("ruby --version | sed 's/.*ruby //g' | sed 's/ (.*//g' | sed 's/[a-z]/./g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['node'] = subprocess.Popen("node --version | sed 's/.*v//g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['sass'] = subprocess.Popen("sass --version | sed 's/.*Sass //g' | sed 's/ (.*//g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['gcc'] = subprocess.Popen("gcc --version | head -1 | sed 's/.*) //g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['make'] = subprocess.Popen("make --version | head -1 | sed 's/.*Make//g' | sed 's/ //g' | head -1", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip().split('\n')[0]
print(", \033[94m3\033[0m"),

# line 4
ver['django'] = subprocess.Popen('python -c "import django; print django.__version__"', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
open(os.path.join(MEDIA_ROOT, 'data/temp.txt'), 'w').write(subprocess.Popen('pip show django-crontab', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip())
ver['django_crontab'] = subprocess.Popen("head -4 %s | tail -1 | sed 's/.*: //g'" % os.path.join(MEDIA_ROOT, 'data/temp.txt'), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
open(os.path.join(MEDIA_ROOT, 'data/temp.txt'), 'w').write(subprocess.Popen('pip show django-environ', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip())
ver['django_environ'] = subprocess.Popen("head -4 %s | tail -1 | sed 's/.*: //g'" % os.path.join(MEDIA_ROOT, 'data/temp.txt'), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['django_suit'] = subprocess.Popen('python -c "import suit; print suit.VERSION"', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['django_adminplus'] = subprocess.Popen('python -c "import adminplus; print adminplus.__version__"', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
open(os.path.join(MEDIA_ROOT, 'data/temp.txt'), 'w').write(subprocess.Popen('pip show django-filemanager', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip())
ver['django_filemanager'] = subprocess.Popen("head -4 %s | tail -1 | sed 's/.*: //g'" % os.path.join(MEDIA_ROOT, 'data/temp.txt'), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
print(", \033[94m4\033[0m"),

# line 5
ver['tkinter'] = subprocess.Popen('python -c "import Tkinter; print Tkinter.Tcl().eval(\'info patchlevel\')"', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['virtualenv'] = subprocess.Popen('python -c "import virtualenv; print virtualenv.__version__"', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['boto'] = subprocess.Popen('python -c "import boto; print boto.__version__"', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
open(os.path.join(MEDIA_ROOT, 'data/temp.txt'), 'w').write(subprocess.Popen('pip show slacker', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip())
ver['slacker'] = subprocess.Popen("head -4 %s | tail -1 | sed 's/.*: //g'" % os.path.join(MEDIA_ROOT, 'data/temp.txt'), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['dropbox'] = subprocess.Popen('python -c "import dropbox; print dropbox.__version__"', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
open(os.path.join(MEDIA_ROOT, 'data/temp.txt'), 'w').write(subprocess.Popen('pip show gviz-api.py', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip())
ver['gviz'] = subprocess.Popen("head -4 %s | tail -1 | sed 's/.*: //g'" % os.path.join(MEDIA_ROOT, 'data/temp.txt'), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
print(", \033[94m5\033[0m"),

# line 6
ver['requests'] = subprocess.Popen('python -c "import requests; print requests.__version__"', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['simplejson'] = subprocess.Popen('python -c "import simplejson; print simplejson.__version__"', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
open(os.path.join(MEDIA_ROOT, 'data/temp.txt'), 'w').write(subprocess.Popen('pip show pygithub', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip())
ver['pygithub'] = subprocess.Popen("head -4 %s | tail -1 | sed 's/.*: //g'" % os.path.join(MEDIA_ROOT, 'data/temp.txt'), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['beautifulsoup'] = subprocess.Popen('python -c "import bs4; print bs4.__version__"', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['html5lib'] = subprocess.Popen('python -c "import html5lib; print html5lib.__version__[0:5]"', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
print(", \033[94m6\033[0m"),

# line 7
open(os.path.join(MEDIA_ROOT, 'data/temp.txt'), 'w').write(subprocess.Popen('npm list', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip())
for key in ['express', 'helmet', 'sanitizer', 'nunjucks', 'glob', 'striptags']:
    ver[key] = subprocess.Popen("cat %s | grep %s | head -1 | sed 's/.*@//g' | sed 's/ .*//g'" % (os.path.join(MEDIA_ROOT, 'data/temp.txt'), key), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
print(", \033[94m7\033[0m"),

# line 8
for key in ['jshint', 'jshint-stylish', 'body-parser', 'nodemailer', 'supervisor']:
    ver[key] = subprocess.Popen("cat %s | grep %s | head -1 | sed 's/.*@//g' | sed 's/ .*//g'" % (os.path.join(MEDIA_ROOT, 'data/temp.txt'), key), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
print(", \033[94m8\033[0m"),

# line 9
ver['grunt'] = subprocess.Popen("grunt --version | head -2 | head -1 | sed 's/.*v//g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
for key in ['clean', 'concat', 'copy', 'sass']:
    ver['grunt_contrib_%s' % key] = subprocess.Popen("cat %s | grep grunt-contrib-%s | head -1 | sed 's/.*@//g' | sed 's/ .*//g'" % (os.path.join(MEDIA_ROOT, 'data/temp.txt'), key), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip().split('\n')[0]
ver['node-sass'] = subprocess.Popen("cat %s | grep node-sass-middleware | head -1 | sed 's/.*@//g' | sed 's/ .*//g'" % os.path.join(MEDIA_ROOT, 'data/temp.txt'), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip().split('\n')[0]
print(", \033[94m9\033[0m"),

# line 10
for key in ['jshint', 'cssmin', 'htmlmin', 'imagemin', 'uglify', 'watch']:
    ver['grunt_contrib_%s' % key] = subprocess.Popen("cat %s | grep grunt-contrib-%s | head -1 | sed 's/.*@//g' | sed 's/ .*//g'" % (os.path.join(MEDIA_ROOT, 'data/temp.txt'), key), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip().split('\n')[0]
print(", \033[94m10\033[0m"),

# line 11
ver['bower'] = subprocess.Popen("bower --version", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
open(os.path.join(MEDIA_ROOT, 'data/temp.txt'), 'w').write(subprocess.Popen('bower list', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip())
for key in ['bootstrap', 'jquery', 'font-awesome', 'isotope', 'gsap']:
    ver[key] = subprocess.Popen("cat %s | grep %s | head -1 | sed 's/.*%s//g' | sed 's/ .*//g' | sed 's/\#//g'" % (os.path.join(MEDIA_ROOT, 'data/temp.txt'), key, key), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
print(", \033[94m11\033[0m"),

# line 12
for key in ['scrollmagic', 'moment', 'd3', 'fullcalendar', 'headjs']:
    ver[key] = subprocess.Popen("cat %s | grep %s | head -1 | sed 's/.*%s//g' | sed 's/ .*//g' | sed 's/\#//g'" % (os.path.join(MEDIA_ROOT, 'data/temp.txt'), key, key), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
print(", \033[94m12\033[0m"),

# line 13
open(os.path.join(MEDIA_ROOT, 'data/temp.txt'), 'w').write(subprocess.Popen('nginx -v', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip())
ver['nginx'] = subprocess.Popen("head -1 %s | sed 's/.*\///g'" % os.path.join(MEDIA_ROOT, 'data/temp.txt'), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['uwsgi'] = subprocess.Popen("uwsgi --version", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['pm2'] = subprocess.Popen("pm2 -v", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['openssl'] = subprocess.Popen("openssl version | sed 's/.*OpenSSL //g' | sed 's/[a-z].*//g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
open(os.path.join(MEDIA_ROOT, 'data/temp.txt'), 'w').write(subprocess.Popen('~/letsencrypt/letsencrypt-auto --version', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip())
ver['letsencrypt'] = subprocess.Popen("tail -1 %s | sed 's/.* //g'" % os.path.join(MEDIA_ROOT, 'data/temp.txt'), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['mysql'] = subprocess.Popen("mysql --version | sed 's/,.*//g' | sed 's/.*Distrib //g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
print(", \033[94m13\033[0m"),

# line 14
ver['git'] = subprocess.Popen("git --version | sed 's/.*version //g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['pip'] = subprocess.Popen('python -c "import pip; print pip.__version__"', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['npm'] = subprocess.Popen('npm --version', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['gem'] = subprocess.Popen('gem --version', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['htop'] = subprocess.Popen("htop --version | head -1 | sed 's/.*htop //g' | sed 's/ \-.*//g'", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
ver['yuicompressor'] = subprocess.Popen("java -jar %s/../yuicompressor.jar -V" % MEDIA_ROOT, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()[0].strip()
print(", \033[94m14\033[0m.")


subprocess.Popen('rm %s' % os.path.join(MEDIA_ROOT, 'data/temp.txt'), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
for key, value in ver.iteritems():
    value = re.findall(r'[\d\.]+', value)[-1]
print simplejson.dumps(ver, indent=' ' * 4, sort_keys=True)


print("\033[92mSUCCESS\033[0m: \033[94mVersions\033[0m recorded in cache/stat_sys.json and cache/stat_ver.json.")
print("All done successfully!")
print("Time elapsed: %.1f s." % (time.time() - t0))

