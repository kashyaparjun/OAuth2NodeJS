var app = require('./server');
var models = require('./models');

models.User.create({
  email: 'monkey@monkey.com',
  hashed_password: '$2a$10$aZB36UooZpL.fAgbQVN/j.pfZVVvkHxEnj7vfkVSqwBOBZbB/IAAK'
}, function() {
  models.OAuthClientsModel.create({
    clientId: 'papers3',
    clientSecret: '123',
    redirectUri: '/oauth/redirect'
  }, function() {
    process.exit();
  });
});