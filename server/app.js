    fs        = require('fs'),
    nunjucks  = require('nunjucks'),
    sanitizer = require('sanitizer'),
    striptags = require('striptags');


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


app.get('/defense', function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=1296000');
    res.sendFile(path.join(root, 'img/t47/phd_defense.png'));
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
        if (subject.indexOf('http://') !== -1 || subject.indexOf('https://') !== -1) {
            res.status(403).send();
        } else {
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
        }
    } else {
        res.status(400).send();
    }
});


app.get(/^\/favicon\.ico\/?$/, function (req, res) {
    res.sendFile('img/t47/t47_icon.png', {'root': root});
});


app.get(/^\/error\/(400|401|403|404|405|500|502|503)\/?$/, function (req, res, next) {
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
    err.status = 405;
    next(err);
});
app.put('*', function (req, res, next) {
    var err = new Error();
    err.status = 405;
    next(err);
});
app.delete('*', function (req, res, next) {
    var err = new Error();
    err.status = 405;
    next(err);
});


app.use(function (req, res, next) {
    if(req.url.substr(-1) == '/' && req.url.length > 1) {
        var query = req.url.slice(req.path.length);
        res.redirect(301, req.url.slice(0, -1) + query);
    } else {
        next();
    }
});

app.use(function (err, req, res, next) {
    if ([400, 401, 403, 404, 405, 500, 502, 503].indexOf(err.status) == -1) {
        console.log(err);
        err.status = 503;
    }

    res.status(err.status);
    res.render('http_' + err.status.toString() + '.html', {
        'DEBUG': DEBUG,
        'GA_ID': GA_ID
    });
});

