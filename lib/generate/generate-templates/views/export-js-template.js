module.exports = function(viewName) {
  return `export * from './${viewName}';
`;
};
