import Woowahan from 'woowahan';
import { FETCH_POSTS } from '../actions';

export default Woowahan.Reducer.create(FETCH_POSTS, function(options) {
  this.onSuccess = function(response) {
		this.finish(response);
  };

  this.getData(`https://jsonplaceholder.typicode.com/posts`);
});


