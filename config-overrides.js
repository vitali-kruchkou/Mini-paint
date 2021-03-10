const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@modules': 'src/modules',
    '@providers': 'src/providers',
    '@routes': 'src/routes',
    '@firebaseConfig': 'src/firebase',
  })(config);

  return config;
};
