sudo chown -R admin:www-data *
sudo chmod 640 *.html

sudo chmod 640 $(find css -type f)
sudo chmod 750 $(find css -type d)
sudo chmod 640 $(find fonts -type f)
sudo chmod 750 $(find fonts -type d)
sudo chmod 640 $(find html -type f)
sudo chmod 750 $(find html -type d)
sudo chmod 640 $(find img -type f)
sudo chmod 750 $(find img -type d)
sudo chmod 640 $(find js -type f)
sudo chmod 750 $(find js -type d)
sudo chmod 640 $(find pdf -type f)
sudo chmod 750 $(find pdf -type d)

sudo chown -R admin:admin *.sh
sudo chmod -R 700 *.sh
