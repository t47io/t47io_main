app.get('/defense', function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=1296000');
    res.sendFile(path.join(root, 'img/t47/phd_defense.png'));
});

app.get('/git', function (req, res, next) {
    if (req.query.repo in config.gitRepo && ['n', 'c', 'a'].indexOf(req.query.type) > -1) {
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


