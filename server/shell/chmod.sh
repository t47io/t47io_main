sudo chown -R admin:www-data *
sudo chown -R admin:admin app build server node_modules
sudo chown admin:admin *.js *.json *.md *.txt

find app -type f | sudo xargs chmod 640
find app -type d | sudo xargs chmod 750
find build -type f | sudo xargs chmod 640
find build -type d | sudo xargs chmod 750
find config -type f | sudo xargs chmod 640
find config -type d | sudo xargs chmod 750
find public -type f | sudo xargs chmod 640
find public -type d | sudo xargs chmod 750
find server -type f | sudo xargs chmod 640
find server -type d | sudo xargs chmod 750

sudo chmod 600 *.js* *.md *.py
sudo chown admin:admin *.sh .git
sudo chmod 700 *.sh
find .git -type f | sudo xargs chmod 640
find .git -type d | sudo xargs chmod 750

find node_modules -type f | sudo xargs chmod 640
find node_modules -type d | sudo xargs chmod 750

