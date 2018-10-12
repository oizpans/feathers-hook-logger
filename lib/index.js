const debug = require('debug')('feathers-mq:hook:');
const Errors = require('@feathersjs/errors');

module.exports = function Logger(excludedServices = ['logs']) {
  // throw error if excludedServices is empty.
  if (!excludedServices.length) {
    throw new Errors.NotAcceptable('specify excluded services.');
  }

  if (!excludedServices.includes('logs')) {
    excludedServices.push('logs');
  }

  return async (context) => {
    const appName = context.app.get('name');

    if (!appName) {
      throw new Errors.BadRequest('App name is required');
    }

    if (excludedServices.includes(context.path)) {
      return context;
    }

    const logData = {
      result: context.result,
      method: context.method,
      service: context.path,
      data: context.data,
      params: context.params,
      type: context.type,
      app: appName,
    };

    if (!context.app.service('logs')) {
      throw new Errors.BadRequest('local service (logs) not found');
    }

    // NOTE: simulate the internal call only
    const newParams = Object.assign({}, context.params);
    delete newParams.provider;

    await context.app.service('logs').create(logData, newParams);
    debug('%O', logData);

    return context;
  };
};
