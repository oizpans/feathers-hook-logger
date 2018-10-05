# feathers hook logger
- The hook that sends data to **logs service**. ( registered locally )

<img src="https://img.shields.io/github/tag/oizpans/feathers-hook-logger.svg" /> <img src="https://img.shields.io/npm/v/jest.svg?label=jest" /> <img src="https://img.shields.io/npm/v/eslint.svg?label=eslint" />



1. Register the logs service. This service responsible for logs storage.

   Example:

   *file: `services/logs/index.js`*
   ```js
    const Service = require('feathers-mongoose');
    const options = {};
    app.use('logs', new Service(options));
   ```

2. Install and register the hooks-logger, 

   Example: 

   *file: `services/products/hooks.js`*

   ```js
   const logger = require('feathers-hook-logger');

   module.exports = {
    before: {
      after: [logger()] // every product created will be logged. 
    }
   };
   ```
