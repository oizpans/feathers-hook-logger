const debug = require('debug')('feathers-mq:hook:');
const Errors = require('@feathersjs/errors');

module.exports = function Logger() {
  return function logger(context) {
    const appName = context.app.get('name');

    if (!appName) {
      throw new Errors.BadRequest('App name is required');
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

    context.app.service('logs').create(logData, { $rpcType: false });
    debug('%O', logData);

    return context;
  };
};
