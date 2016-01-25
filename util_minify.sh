sudo rm public/js/*.min.js
if [ $(whoami) = "admin" ];
then
	java -jar ../yuicompressor.jar -o '.js$:.min.js' public/js/*.js
else
	java -jar ../../yuicompressor.jar -o '.js$:.min.js' public/js/*.js
fi

sudo rm public/css/*.min.css
if [ $(whoami) = "admin" ];
then
	java -jar ../yuicompressor.jar -o '.css$:.min.css' public/css/*.css
else
	java -jar ../../yuicompressor.jar -o '.css$:.min.css' public/css/*.css
fi
