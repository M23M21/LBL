const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('js', 'jsx', 'ts', 'tsx');
const { assetExts } = config.resolver;
  config.resolver.assetExts = [...assetExts, 'png', 'jpg', 'jpeg', 'gif'];

module.exports = config;