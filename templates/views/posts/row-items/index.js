import Woowahan from 'woowahan';
import Template from './index.hbs';

export default Woowahan.ItemView.create('RowItem', {
  template: Template,
  onSelectedRow(event, trigger) {
    trigger({ id: this.getModel('id') });
  }
});
