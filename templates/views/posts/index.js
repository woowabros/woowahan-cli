import Woowahan from 'woowahan';
import template from './index.hbs';
import RowItem from './row-items';

import { FETCH_POSTS } from '../../actions';

export const PostsView = Woowahan.CollectionView.create('PostsView', {
  template,
  rowContainer: 'table > tbody',
  rowView: RowItem,

  initialize() {
    this.dispatch(Woowahan.Action.create(FETCH_POSTS), this.fetchPosts);

    this.super();
  },

  fetchPosts(err, data) {
    if (err) {
      console.error(err);
      return;
    }

  	this.reload(data);
  }
});
