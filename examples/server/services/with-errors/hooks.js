const logger = require('../../../../lib/');

module.exports = {
  after: [
  ],
  error: {
    all: [logger()],
  },
};
