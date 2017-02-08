import Woowahan from 'woowahan';
import Template from './layout.hbs';

export default Woowahan.View.create('LayoutView', {
  template: Template,
  initialize() {
    this.super();
  }
});
