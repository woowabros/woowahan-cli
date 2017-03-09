module.exports = function(viewName) {
    return `import Woowahan from 'woowahan';
import Template from './index.hbs';

export default Woowahan.ItemView.create('${viewName}ItemView', {
  template: Template,
  events: {
  },
  viewWillMount(renderData) {
    // .. write your code
    return renderData;
  },
  viewDidMount($el) {
    // .. write your code
  },
  viewWillUnmount() {
    // .. write your code
  }
});
`;
};
