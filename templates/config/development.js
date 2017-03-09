var buildConfigCommon = require('./common').buildConfig;

var buildConfigDev = {
	isProduction: false,
	devtool: 'inline-source-map'
};

module.exports = {
	buildConfig: Object.assign(buildConfigDev, buildConfigCommon)
};
