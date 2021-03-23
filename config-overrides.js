/* eslint-disable @typescript-eslint/no-var-requires */
// const { alias } = require('react-app-rewire-alias');

// module.exports = function override(config) {
//   alias({
//     '@modules': 'src/modules',
//     '@providers': 'src/providers',
//     '@routes': 'src/routes',
//     '@firebaseConfig': 'src/firebase/*',
//     '@hooks': 'src/hooks',
//   })(config);

//   return config;
// };

// const path = require('path');
// module.exports = function override(config) {
//   config.resolve = {
//     ...config.resolve,
//     alias: {
//       ...config.alias,
//       modules: path.resolve(__dirname, 'src/modules'),
//       routes: path.resolve(__dirname, 'src/routes'),
//       store: path.resolve(__dirname, 'src/store'),
//       type: path.resolve(__dirname, 'src/type'),
//       firebaseConfig: path.resolve(__dirname, 'src/firebase'),
//     },
//   };
//   return config;
// };

const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@modules': 'src/modules',
    '@firebaseConfig': 'src/firebase',
    '@routes': 'src/routes',
    '@store': 'src/store',
    '@assets': 'src/assets',
    '@guards': 'src/guards',
  })(config);

  return config;
};
