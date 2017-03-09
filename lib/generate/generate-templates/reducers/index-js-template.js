module.exports = function(config) {
	var name = config.name;
	var actionName = config.actionName;

  return `import Woowahan from 'woowahan';
import { successHandler, failHandler, ajax } from './toolbox';
import { ${actionName } } from '../actions';

/**
 	ajax.method(context, url, options)
  method : get, post, put, delete
**/

export const ${name} = Woowahan.Reducer.create(${actionName}, function(options) {
  this.use(Woowahan.Reducer.SUCCESS, successHandler);
  this.use(Woowahan.Reducer.FAIL, failHandler);

  this.onSuccess = function(response) {
    this.finish(null, response); // err, response
  };

  ajax.get(this, 'https://jsonplaceholder.typicode.com/posts');
});
`;
};
