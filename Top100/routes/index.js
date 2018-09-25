var express = require('express');
var router = express.Router();
const request = require("request");

/* GET home page. */
router.get('/', function (req, res, next) {
  const _url = "https://rss.itunes.apple.com/api/v1/us/apple-music/top-albums/all/100/explicit.json"
  request.get(_url, (error, response, body) => {
    const _json = JSON.parse(body);
    const _top100 = _json.feed.results;
    console.log({_top100: _top100[0]})
    res.render('index', { title: 'TIY Top 100 of the day', data: _top100 });
  });
});

router.get('/search', function (req, res, next) {
  let _term = req.query.needle;
  let _url = "https://itunes.apple.com/search?&entity=album&term=" + _term;
  request.get(_url, (error, response, body) => {
    let _json = JSON.parse(body);
    let _top100 = _json.results;
    res.render('index', { title: 'TIY Top 100 of the day', data: _top100, needle:_term });
  });
});


module.exports = router;
