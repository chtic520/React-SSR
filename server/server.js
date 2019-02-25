const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const ReactSSR = require('react-dom/server');
const fs = require('fs');
const path = require('path');

const serverRender = require('./util/server-render');

const isDev = process.env.NODE_ENV === 'development';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react enode class'
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')));

app.use('/api/user', require('./util/handle-login'));
app.use('/api', require('./util/proxy'));

if(!isDev){
  const serverEntry = require('../dist/server-entry');
  
  const template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf8');

  app.use('/public', express.static(path.join(__dirname, '../dist')));

  app.get('*', function(req, res){
    serverRender(serverEntry, template, req, res);
  })
}else{
  const devStatic = require('./util/dev-static');
  devStatic(app);
}

app.use(function(err, req, res, next){
  console.log(err);
  res.status(500).send(err);
})


app.listen(3333, function(){
  console.log('server is listening at 3333');
})
