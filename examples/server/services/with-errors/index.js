const service = require('./service');
const hooks = require('./hooks');

module.exports = function products(app) {
  app.use('with-errors', service({}));
  app.service('with-errors').hooks(hooks);
};
