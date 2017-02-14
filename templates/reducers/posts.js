import Woowahan from 'woowahan';
import { successHandler, failHandler, ajax } from './toolbox';
import { FETCH_POSTS } from '../actions';

export const fetchPosts = Woowahan.Reducer.create(FETCH_POSTS, function(options) {
  this.use(Woowahan.Reducer.SUCCESS, successHandler);
  this.use(Woowahan.Reducer.FAIL, failHandler);

  this.onSuccess = function(response) {
		this.finish(null, response);
  };

  ajax.get(this, 'https://jsonplaceholder.typicode.com/posts');
});
