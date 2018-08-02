const debug = require('debug')('hooks-logger:');
const feathers = require('@feathersjs/feathers');
const services = require('./services');

const app = feathers();

app.set('name', 'some_app');

app.configure(services);

(async function run() {
  await app.service('with-errors').find();
}());

debug('running instance with appName:', app.get('name'));
