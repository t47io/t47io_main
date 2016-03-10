cd /home/admin/t47io/main

python stats_git.py
python stats_pub.py

chown -R admin:admin data
chown admin:www-data config/dat.json
chmod 640 data/*.json
chmod 640 config/dat.json
