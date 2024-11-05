const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,
  transformer: {
    ...config.transformer,
    // ... your transformer config
  },
  resolver: {
    ...config.resolver,
    // ... your resolver config
  },
}; 