const products = require('./products');
const withErrors = require('./with-errors');

module.exports = function services(app) {
  app.configure(products);
  app.configure(withErrors);
};
