const { BadRequest } = require('@feathersjs/errors');
const app = require('./app');

const mockCreateMethod = jest.fn();

describe('Test', () => {
  afterAll((done) => {
    // closing the app instance
    app.close(done);
  });

  test('It should throw error when app name not set', async () => {
    const appName = app.get('name');
    expect(appName).toBe(undefined);

    try {
      await app.service('my-service').create({});
    } catch (e) {
      expect(e instanceof BadRequest);
      expect(e.message).toEqual('App name is required');
    }
  });

  test('It throw error, when local service name \'logs\' not registered', async () => {
    app.set('name', 'any_app');

    expect(app.service('logs')).toEqual(undefined);

    try {
      await app.service('my-service').create({});
    } catch (e) {
      expect(e.message).toEqual('local service not found.');
    }
  });

  test('It should discard to create log when used by logs service.', async () => {
    // application name
    app.set('name', 'any_app');

    // local service
    app.use('logs', {
      async create(data, params) {
        return mockCreateMethod(data, params);
      },
    });

    await app.service('logs').create({}, { params: '1' });

    expect(mockCreateMethod.mock.calls.length).toBe(1);

    // unregister the logs service
    delete app.services.logs;
  });

  test('It should create log.', async () => {
    // application name
    app.set('name', 'any_app');

    // local service
    app.use('logs', {
      async create(data, params) {
        return mockCreateMethod(data, params);
      },
    });

    // calling non log service
    await app.service('my-service').create({});

    const [firstCall] = mockCreateMethod.mock.calls;
    const [firstArg] = firstCall;

    expect(firstArg).toHaveProperty('app', 'any_app');
    expect(firstArg).toHaveProperty('method', 'create');
    expect(firstArg).toHaveProperty('service', 'my-service');

    // unregister the logs service
    delete app.services.logs;
  });
});
