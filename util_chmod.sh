sudo chown -R admin:www-data *
sudo chown -R admin:admin data node_modules bower_components
sudo chown admin:admin *.py *.js *.json *.md *.txt

find src -type f | sudo xargs chmod 640
find src -type d | sudo xargs chmod 750
find dist -type f | sudo xargs chmod 640
find dist -type d | sudo xargs chmod 750
find config -type f | sudo xargs chmod 640
find config -type d | sudo xargs chmod 750
find data -type f | sudo xargs chmod 640
find data -type d | sudo xargs chmod 750

sudo chmod 600 *.js* *.md *.py
sudo chown admin:admin *.sh .git
sudo chmod 700 *.sh
find .git -type f | sudo xargs chmod 640
find .git -type d | sudo xargs chmod 750

find bower_components -type f | sudo xargs chmod 640
find bower_components -type d | sudo xargs chmod 750
find node_modules -type f | sudo xargs chmod 640
find node_modules -type d | sudo xargs chmod 750

