module.exports = function(config) {
  return `export * from './${config.name}';
`;
};
