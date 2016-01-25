sudo chown -R admin:www-data *
sudo chmod 640 *.js *.txt *.md

sudo chmod 640 $(find public -type f)
sudo chmod 750 $(find public -type d)

sudo chmod 640 $(find config -type f)
sudo chmod 750 $(find config -type d)

sudo chown -R admin:admin *.sh
sudo chmod -R 700 *.sh
