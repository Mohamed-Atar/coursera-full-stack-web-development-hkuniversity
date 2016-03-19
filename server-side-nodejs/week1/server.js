/**
 * Created by mmaia on 3/19/16.
 */
'use strict';

var
  express = require('express'),
  morgan = require('morgan'),
  dishRouter = require('./dishRouter'),
  promoRouter = require('./promoRouter'),
  leaderRouter = require('./leaderRouter');

var hostname = '0.0.0.0';
var port = 3000;

var app = express();

app.use(morgan('dev'));

//mounting the dishes route
app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promos', promoRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log('Server running at http://${hostname}:${port}/');
});