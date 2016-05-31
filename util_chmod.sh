sudo chown -R admin:www-data *
sudo chown -R admin:admin data node_modules bower_components
sudo chmod 640 *.js* *.md *.py

find public -type f | sudo xargs chmod 640
find public -type d | sudo xargs chmod 750
find views -type f | sudo xargs chmod 640
find views -type d | sudo xargs chmod 750
find config -type f | sudo xargs chmod 640
find config -type d | sudo xargs chmod 750
find data -type f | sudo xargs chmod 640
find data -type d | sudo xargs chmod 750

sudo chown -R admin:admin *.sh .git
sudo chmod -R 700 *.sh
find .git -type f | sudo xargs chmod 640
find .git -type d | sudo xargs chmod 750
