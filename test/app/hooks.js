const hookLogger = require('../../lib');

module.exports = {
  before: {
    create: [hookLogger()],
  },
};
