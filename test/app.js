const feathers = require('@feathersjs/feathers');
const hooks = require('./hooks');

const app = feathers();

// create a service
const myService = {
  async create(data, params) {
    return { data, params };
  },
};
app.use('my-service', myService);
app.hooks(hooks);

module.exports = app;
