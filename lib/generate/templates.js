var generateTemplates = require('./generate-templates');

module.exports = function(fileName, config) {
  switch (config.generate) {
    case 'views':
      fileName = tranformStrToCamelCase(fileName);
      return generateTemplates[config.generate][config.type][fileName](config.name);
    
    case 'reducers':
      if (!config.type) {
        config.type = 'default'; 
      }
      fileName = 'IndexJs';
      return generateTemplates[config.generate][config.type][fileName](config);
    
    case 'actions':
      if (!config.type) {
        config.type = 'default';
      }
      fileName = 'IndexJs';
      return generateTemplates[config.generate][config.type][fileName](config);
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

