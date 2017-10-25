var express = require('express');

var bodyParser = require('body-parser');

const OAuth2Server = require('node-oauth2-server');

var models = require('./models');

var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.oauth = new OAuth2Server({
    model: models.oauth,
    grants: ['password', 'authorization_code', 'refresh_token']
});

app.all('/oauth/token', app.oauth.grant());

app.all('/oauth/authorise', app.oauth.authCodeGrant((req, next) => {
    next(null, true, '123456', null);
}));

app.get('/', app.oauth.authorise(), (req,res) => {
    res.send('Secret Area');
});

app.use(app.oauth.errorHandler());

app.listen(port, () => {
    console.log('listening to port'+port);
});

