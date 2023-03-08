function getRandomIntInclusive(min, max) { //from developer.mozilla.org
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

module.exports.json =
  (req, res) => {
    //const value = this._url.searchParams.get('value') || 'unknown';
    req.query['date'] = new Date();
    res.status(200).json(req.query);
  }

module.exports.random =
  (_, res) => {
    res.status(200).json({randomValue:getRandomIntInclusive(0,100)});
  }