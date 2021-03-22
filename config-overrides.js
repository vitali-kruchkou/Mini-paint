/* eslint-disable @typescript-eslint/no-var-requires */
// const { alias } = require('react-app-rewire-alias');

// module.exports = function override(config) {
//   alias({
//     '@modules': 'src/modules',
//     '@providers': 'src/providers',
//     '@routes': 'src/routes',
//     '@firebaseConfig': 'src/firebase',
//     '@hooks': 'src/hooks',
//   })(config);

//   return config;
// };

const path = require('path');
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      modules: path.resolve(__dirname, 'src/modules'),
      interfaces: path.resolve(__dirname, 'src/shared/interfaces'),
    },
  };
  return config;
};
