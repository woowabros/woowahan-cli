import Woowahan from 'woowahan';
import Template from './index.hbs';

export default Woowahan.ItemView.create('RowItem', {
  template: Template,
  events: {
  },
  viewWillmount(renderData) {
    return renderData;
  },
  viewDidMount($el) {
  },
  viewWillUnmount() {
  }
});
