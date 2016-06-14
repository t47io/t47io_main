var body_p    = require('body-parser'),
    emailer   = require('nodemailer'),
    express   = require('express'),
    fs        = require('fs'),
    glob      = require('glob'),
    helmet    = require('helmet'),
    moment    = require('moment'),
    nunjucks  = require('nunjucks'),
    path      = require('path'),
    sanitizer = require('sanitizer'),
    sass      = require('node-sass-middleware'),
    striptags = require('striptags');

var app       = express(),
    pub       = JSON.parse(fs.readFileSync('config/pub.json', 'utf8')),
    dat       = JSON.parse(fs.readFileSync('config/dat.json', 'utf8')),
    config    = JSON.parse(fs.readFileSync('config/env.json', 'utf8')),
    contact   = config.email.login,
    smtp      = emailer.createTransport(config.email.protocol + '://' + contact.replace('@', '%40') + ':' + config.email.password + '@' + config.email.host + ':' + config.email.port),
    projs     = [];

var DEBUG     = config.DEBUG,
    GA_ID     = config.ga_tracker,
    port      = config.port,
    root      = path.join(__dirname, DEBUG ? 'src' : 'dist');

for (var key in pub) {
    dat.counters.publication += pub[key].length;
    for (var i = 0; i < pub[key].length; i++) {
        var item = pub[key][i];
        item.author = item.author.replace('Tian, S.,', '<u class="text-main bg-light-gray">Tian, S.,</u>');
    }
}
for (var i = 0; i < dat.projects.order.length; i++) {
    var key = dat.projects.order[i];
    if (!('url' in dat.projects[key])) { projs.push(key); }
}

var resume = '', git_contrib = '';
glob(path.join(root, 'pdf/Resume*.pdf'), {}, function (err, files) {
    if (err) {
        console.log(err);
        err = new Error();
        err.status = 500;
        next(err);
    }
    resume = files[files.length - 1];
});
glob(path.join(__dirname, 'data/git_contrib_*.svg'), {}, function (err, files) {
    if (err) {
        console.log(err);
        err = new Error();
        err.status = 500;
        next(err);
    }
    git_contrib = files[files.length - 1];
});


app.use(function (req, res, next) {
    if (req.url.match(/\.(png|jpg|gif|svg|ttf|pdf)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=5184000');      // 60 days
    } else if (req.url.match(/\.(css|js|json)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=1296000');      // 15 days
    }
    next();
});
app.use( sass({
    'src':         path.join(root, 'sass/'),
    'dest':        path.join(root, 'css/'),
    'prefix':      '/css',
    'response':    false,
    'outputStyle': 'expanded',
    'debug':        DEBUG
}) );
app.use( express.static(root) );
app.use( helmet() );
app.use( body_p.urlencoded({'extended': true}) );
app.disable('x-powered-by');

app.engine('nunj', nunjucks.render);
app.set('view engine', 'nunjucks');
nunjucks.configure(DEBUG ? 'src/html' : 'dist/html', {
    'autoescape': false,
    'express':    app
});


app.listen(port, function () {
    console.log('t47io Main Site listening on port: ' + port + ' ...');
});

app.get('/', function (req, res) {
    var res_date = resume.replace(path.join(root, 'pdf/Resume_'), '').replace('.pdf', '');
    res.render('_index.html', {
        'DEBUG':     DEBUG,
        'pub_list':  pub,
        'dat_dict':  dat,
        'links':     config.links,
        'resume':    moment(res_date, 'YYYYMMDD').format('MMM YYYY'),
        'GA_ID':     GA_ID
    });
});
app.get(/^\/project\/(daslab|rmdb|primerize|eterna|spindle|hitrace|celica|ribokit)\/?$/, function (req, res, next) {
    var proj = req.params[0];
    res.render('project_' + proj + '.html', {
        'DEBUG':        DEBUG,
        'proj':         proj,
        'projs':        projs,
        'title':        dat.projects[proj].title,
        'description':  striptags(dat.projects[proj].description),
        'GA_ID':        GA_ID
    });
});


app.get('/resume', function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=1296000');
    res.setHeader('Content-Disposition', 'inline; filename="SiqiTian_resume.pdf"');
    res.sendFile(resume);
});
app.get('/git/contrib', function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=1296000');
    res.sendFile(git_contrib);
});
app.get('/git', function (req, res, next) {
    if (req.query.repo in config.git_repo && ['n', 'c', 'a'].indexOf(req.query.type) > -1) {
        var json = JSON.parse(fs.readFileSync('data/' + req.query.repo + '_' + req.query.type + '.json', 'utf8'));
        if (req.query.tqx) {
            var req_id = req.query.tqx.replace('reqId:', '');
            json = {
                'table':   json,
                'reqId':   req_id,
                'status':  'ok',
                'version': '0.6'
            };
        }
        res.json(json);
    } else {
        var err = new Error();
        err.status = 400;
        next(err);
    }
});


app.get(/^\/bower_components\/(.+)\/?$/, function (req, res, next) {
    var file = req.params[0];
    if (fs.existsSync('bower_components/' + file)) {
        res.sendFile(req.params[0], {'root': path.join(__dirname, 'bower_components')});
    } else {
        var err = new Error();
        err.status = 404;
        next(err);
    }
});
app.get(/^\/fonts\/(.+)\/?$/, function (req, res, next) {
    var file = req.params[0];
    if (fs.existsSync('bower_components/font-awesome/fonts/' + file)) {
        res.sendFile(req.params[0], {'root': path.join(__dirname, 'bower_components/font-awesome/fonts')});
    } else {
        var err = new Error();
        err.status = 404;
        next(err);
    }
});


app.route('/send')
.get(function (req, res, next) {
    res.render('http_201.html', {
        'DEBUG': DEBUG,
        'GA_ID': GA_ID
    });
})
.post(function (req, res, next) {
    var name     = sanitizer.escape(req.body.name),
        email    = sanitizer.escape(req.body.email),
        subject  = sanitizer.escape(req.body.subject),
        message  = sanitizer.escape(req.body.message);

    if (name.length && email.length && subject.length && message.length) {
        smtp.sendMail({
            'to'      : contact,
            'subject' : subject,
            'text'    : name + ' <' + email + '>\n' + moment().format() + '\n\n' + message
        }, function (err, info) {
            if (err) {
                console.log(err);
                res.status(500).send();
            }
            console.log('Message sent.');
            res.status(201).send();
        });
    } else {
        res.status(400).send();
    }
});


app.get('/load', function (req, res) {
    res.render('_load.html', {
        'DEBUG':     DEBUG,
        'GA_ID':     GA_ID
    });
});


app.get(/^\/robots\.txt\/?$/, function (req, res) {
    res.sendFile('robots.txt', {'root': root});
});
app.get(/^\/sitemap\.xml\/?$/, function (req, res) {
    res.sendFile('sitemap.xml', {'root': root});
});
app.get(/^\/favicon\.ico\/?$/, function (req, res) {
    res.sendFile('img/t47/t47_icon.png', {'root': root});
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
        console.log(err);
        err.status = 503;
    }

    res.status(err.status);
    res.render('http_' + err.status.toString() + '.html', {
        'DEBUG': DEBUG,
        'GA_ID': GA_ID
    });
});

