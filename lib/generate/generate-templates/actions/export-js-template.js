module.exports = function(config) {
	var name = config.name;

  return `export const ${name} = '${name}';
`;
};
