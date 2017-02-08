import Woowahan from 'woowahan';
import Template from './index.hbs';
import RowItem from './row-items';

import { FETCH_POSTS } from '../../actions';

export default Woowahan.CollectionView.create('PostView', {
  template: Template,
  rowContainer: '.list > tbody',
  rowView: RowItem,
  initialize() {
    this.super();
  },
  viewDidMount() {
    this.dispatch(Woowahan.Action.create(FETCH_POSTS), this.fetchPosts);
  },
  fetchPosts(data) {
  	this.reload(data);
  }
});
