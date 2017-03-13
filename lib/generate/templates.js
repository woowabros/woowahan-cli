var generateTemplates = require('./generate-templates');

module.exports = function(fileName, templateConfig) {
  switch (templateConfig.generate) {
    case 'views':
      fileName = tranformStrToCamelCase(fileName);
      return generateTemplates[templateConfig.generate][templateConfig.type][fileName](templateConfig.name);

    case 'reducers':
      if (!templateConfig.type) {
        templateConfig.type = 'default';
      }
      fileName = 'IndexJs';
      return generateTemplates[templateConfig.generate][templateConfig.type][fileName](templateConfig);

    case 'actions':
      if (!templateConfig.type) {
        templateConfig.type = 'default';
      }
      fileName = 'IndexJs';
      return generateTemplates[templateConfig.generate][templateConfig.type][fileName](templateConfig);
  }

  return '';
};

function tranformStrToCamelCase(str) {
  var transformedString = str.replace(/([^A-Z0-9]+)(.)/ig, function(match, p1, p2, p3) {
      return p2.toUpperCase();
    }
  );

  return transformedString.charAt(0).toUpperCase() + transformedString.slice(1);
}
