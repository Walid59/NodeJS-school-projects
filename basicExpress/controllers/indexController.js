module.exports.home =
  (req, res) => res.render('index', { title: 'Express' });


module.exports.first =
  (_, res) => {
    const options = {
      root: 'public',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
    res.sendFile('html/first.html', options);
  }

module.exports.second =
  (_, res) => {
    const options = {
      root: 'public',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
    res.sendFile('html/second.html', options);
  }