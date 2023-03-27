module.exports.login =
    (req, res) => res.render('index', { title: 'Connexion' });

module.exports.about =
    (req, res) => res.render('about');

module.exports.adminonly =
    (req, res) => res.render('adminonly');

module.exports.home =
    (_, res) => {
        const options = {
            root: 'public',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };
        res.sendFile('home.html', options);
    }