app.get('/defense', function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=1296000');
    res.sendFile(path.join(root, 'img/t47/phd_defense.png'));
});
