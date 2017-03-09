var buildConfigCommon = require('./common').buildConfig;

var buildConfigProd = {
	isProduction: true,
	devtool: 'cheap-module-source-map'
};

module.exports = {
	buildConfig: Object.assign(buildConfigProd, buildConfigCommon)	
};
