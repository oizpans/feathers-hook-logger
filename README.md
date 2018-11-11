# feathers hook logger

<img src="https://img.shields.io/github/tag/oizpans/feathers-hook-logger.svg" /> <img src="https://img.shields.io/npm/v/jest.svg?label=jest" /> <img src="https://img.shields.io/npm/v/eslint.svg?label=eslint" /> <img src="https://img.shields.io/npm/v/@feathersjs/feathers.svg?label=@feathersjs/feathers" />

- The hook that sends data to **logs service**. ( registered locally )


1. Register the logs service. This service responsible for logs storage.

   Example:

   file: *`services/logs/index.js`*
   ```js
    const Service = require('feathers-mongoose');


    module.exports = function(app) {
      const options = {};
      // definition of logs service
      app.use('logs', new Service(options));

      // adding hook
      // app.service('logs').hooks(hooks);
    }
   ```

2. Install and register the hooks-logger,

   Example:

   file: *`services/products/hooks.js`*

   ```js
   const logger = require('feathers-hook-logger');

   module.exports = {
    after: [
      logger() // listened to all methods
    ]
   };
   ```
