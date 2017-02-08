import Woowahan from 'woowahan';
import Template from './index.hbs';

export default Woowahan.ItemView.create('RowItem', {
  tagName: 'tr',
  template: Template,
  onSelectedRow(event, trigger) {
    trigger({ id: this.getModel('id') });
  }
});
