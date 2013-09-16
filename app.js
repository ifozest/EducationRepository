var express = require('express')
  , http = require('http')
  , path = require('path')
  , newsDAO = require('./back/db/newsDAO');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/newsCollection', function (req, res) {

  newsDAO.fetchAll().then(function (docs) {
    res.send(docs);
  }, function (error) {
    res.send(500, 'empty');
  });


});

app.get('/news/:id', function (req, res) {
  newsDAO.fetchById(req.params.id).then(function (docs) {
    res.send(docs);
  }, function (error) {
    res.send(500, 'empty');
  });
});


app.post('/news', function (req, res) {
  newsDAO.insert(req.body).then(function(docs){
    console.log(docs);
    res.send(docs);
  }, function(err) {
    console.log(err);
    res.send(500, err);
  })
});

app.put('/news/:id', function (req, res) {
  newsDAO.save(req.body).then(function(docs){
    console.log(docs);
    res.send(docs);
  }, function(err) {
    console.log(err);
    res.send(500, err);
  })
});



app.delete('/news/:id', function (req, res) {
  newsDAO.remove(req.params.id).then(function(docs){
    console.log('docs',docs);
    res.send(200, 'removed');
  }, function(err) {
    console.log(err);
    res.send(500, err);
  })
});



http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
