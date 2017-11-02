const request   = require('request')
const semver    = require('semver');
const chalk     = require('chalk');
const manifest  = require('../package.json')

module.exports = done => {
  global.spinner.text = 'checking version';

  if (!semver.satisfies(process.version, manifest.engines.node)) {
    return global.spinner.fail(' You must upgrade node to >=' + manifest.engines.node + '.* to use ' + manifest.name);
  }

  const req = {
    url: 'https://registry.npmjs.org/' + manifest.name,
    timeout: 5000
  };

  request(req, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const npmVersion = JSON.parse(body)['dist-tags'].latest

      if (semver.lt(manifest.version, npmVersion)) {
        global.spinner.warn(` A newer version of ${manifest.name} is available.`);

        console.log(`
latest:    ${chalk.green(npmVersion)}
installed: ${manifest.version}
`);
      }
    }
    
    done(manifest.name, manifest.version);
  });
};
