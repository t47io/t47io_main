sudo chown -R admin:www-data *
sudo chown -R admin:admin data node_modules bower_components
sudo chmod 640 *.js* *.md *.py

sudo chmod 640 $(find public -type f)
sudo chmod 750 $(find public -type d)
sudo chmod 640 $(find views -type f)
sudo chmod 750 $(find views -type d)
sudo chmod 640 $(find config -type f)
sudo chmod 750 $(find config -type d)
sudo chmod 640 $(find data -type f)
sudo chmod 750 $(find data -type d)

sudo chown -R admin:admin *.sh
sudo chmod -R 700 *.sh
