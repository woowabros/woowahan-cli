var generateTemplates = require('./generate-templates');

module.exports = function(fileName, templateConfig) {
  var isAvailableTemplate = true;
  
  switch (templateConfig.generate) {
    case 'views':
      fileName = tranformStrToCamelCase(fileName);
      break;

    case 'reducers':
      if (!templateConfig.type) {
        templateConfig.type = 'default';
      }
      fileName = 'IndexJs';
      break;
      
    case 'actions':
      if (!templateConfig.type) {
        templateConfig.type = 'default';
      }
      fileName = 'IndexJs';
      break;
      
    default:
      isAvailableTemplate = false;
  }
  
  if (!isAvailableTemplate) {
    return '';
  }
  
  return generateTemplates[templateConfig.generate][templateConfig.type][fileName](templateConfig);
};

function tranformStrToCamelCase(str) {
  var transformedString = str.replace(/([^A-Z0-9]+)(.)/ig, function(match, p1, p2, p3) {
      return p2.toUpperCase();
    }
  );

  return transformedString.charAt(0).toUpperCase() + transformedString.slice(1);
}
