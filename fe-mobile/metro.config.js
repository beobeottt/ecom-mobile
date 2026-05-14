const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// Ép Metro load file index từ đúng thư mục node_modules trong dự án
const nativeWindConfigPath = path.resolve(__dirname, "node_modules/nativewind/dist/metro/index.js");
const { withNativeWind } = require(nativeWindConfigPath);

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });