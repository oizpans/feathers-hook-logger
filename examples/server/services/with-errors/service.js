module.exports = function service() {
  return {
    find() {
      // throw new Error('cant find');
      return Promise.reject(new Error('cant find'));
    },
  };
};
