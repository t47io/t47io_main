var body_p    = require('body-parser'),
    emailer   = require('nodemailer'),
	express   = require('express'),
	fs        = require('fs'),
	glob      = require('glob'),
    helmet    = require('helmet'),
    moment    = require('moment'),
    nunjucks  = require('nunjucks'),
	path      = require('path'),
	sanitizer = require('sanitizer');

var app       = express(),
	root      = path.join(__dirname, 'public'),
	pub       = JSON.parse(fs.readFileSync('config/pub.json', 'utf8')),
	dat       = JSON.parse(fs.readFileSync('config/dat.json', 'utf8')),
	config    = JSON.parse(fs.readFileSync('config/env.json', 'utf8')),
	contact   = config.email.login,
	smtp = emailer.createTransport(config.email.protocol + '://' + contact.replace('@', '%40') + ':' + config.email.password + '@' + config.email.host + ':' + config.email.port);
for (var key in pub) {
	dat.publication += pub[key].length;
}
var resume     = '';
glob(path.join(root, 'pdf/Resume*.pdf'), {}, function (err, files) {
	if (err) {
		console.log(err);
		var err = new Error();
		err.status = 500;
		next(err);
	}
	resume = files[files.length - 1];
});

var DEBUG     = config.DEBUG,
	DEBUG_STR = DEBUG ? '' : '.min',
	GA_ID     = config.ga_tracker,
	port      = config.port;

app.use(function (req, res, next) {
    if (req.url.match(/\.(png|jpg|gif|svg|ttf|pdf)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=5184000');      // 60 days
    } else if (req.url.match(/\.(css|js|json)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=1296000');      // 15 days
    }
    next();
});
app.use( express.static(root) );
app.use( helmet() );
app.use( body_p.urlencoded({'extended': true}) );

app.engine('nunj', nunjucks.render);
app.set('view engine', 'nunjucks');
nunjucks.configure('views', {
    'autoescape': false,
    'express':    app
});


app.listen(port, function () {
	console.log('t47io Main Site listening on port: ' + port + ' ...');
});

app.get('/', function (req, res) {
	var res_date = resume.replace(path.join(root, 'pdf/Resume_'), '').replace('.pdf', '');
	res.render('index.html', {
		'DEBUG':     DEBUG_STR,
		'pub_list':  pub,
		'dat_dict':  dat,
		'resume':    moment(res_date, 'YYYYMMDD').format('MMM YYYY'),
		'GA_ID':     GA_ID
	});
});
app.get('/get_ver', function (req, res) {
	res.sendFile('ver.json', {'root': path.join(__dirname, 'config')});
});

app.route('/send')
.get(function (req, res, next) {
	var err = new Error();
	err.status = 400;
	next(err);
})
.post(function (req, res, next) {
	var name     = sanitizer.escape(req.body.name),
		email    = sanitizer.escape(req.body.email),
		subject  = sanitizer.escape(req.body.subject),
		message  = sanitizer.escape(req.body.message);

	smtp.sendMail({
		'to'      : contact,
		'subject' : subject,
		'text'    : name + ' <' + email + '>\n\n' + message
	}, function (err, info) {
		if (err) {
			console.log(err);
			var err = new Error();
			err.status = 500;
			next(err);
		}
		console.log('Message sent.');
		res.status(201).render('201.html', {
			'DEBUG': DEBUG_STR,
			'GA_ID': GA_ID
		});
	});
});

app.get('/resume', function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=1296000');
    res.setHeader('Content-Disposition', 'inline; filename="SiqiTian_resume.pdf"');
	res.sendFile(resume);
});

app.get(/^\/robots\.txt\/?$/, function (req, res) {
	res.sendFile('robots.txt', {'root': root});
});
app.get(/^\/sitemap\.xml\/?$/, function (req, res) {
	res.sendFile('sitemap.xml', {'root': root});
});

app.get(/^\/error\/(400|401|403|404|500|503)\/?$/, function (req, res, next) {
	var err = new Error();
	err.status = parseInt(req.params[0]);
	next(err);
});
app.get('*', function (req, res, next) {
	var err = new Error();
	err.status = 404;
	next(err);
});
app.post('*', function (req, res, next) {
	var err = new Error();
	err.status = 403;
	next(err);
});
app.put('*', function (req, res, next) {
	var err = new Error();
	err.status = 403;
	next(err);
});
app.delete('*', function (req, res, next) {
	var err = new Error();
	err.status = 403;
	next(err);
});

app.use(function (err, req, res, next) {
	if ([400, 401, 403, 404, 500, 503].indexOf(err.status) == -1) {
		err.status = 503;
	}

	res.status(err.status);
	res.render(err.status.toString() + '.html', {
		'DEBUG': DEBUG_STR,
		'GA_ID': GA_ID
	});
});

