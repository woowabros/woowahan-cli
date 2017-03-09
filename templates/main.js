import Woowahan from 'woowahan';
import DefaultLayout from './layouts/default';
import * as views from './views';
import * as reducers from './reducers';

global.$ = global.jQuery = Woowahan.$;

const app = new Woowahan();
const store = {};

app.use(Woowahan.Layout('#app', DefaultLayout));
app.use(reducers);
app.use(store);

const boardsContents = { url: 'boards', view: views.PostsView, routeName: 'boardList', pages: [] };
const siteOption = {
	empty: (page) => { 
		alert(`${page}는 없는 페이지!!`); 
	}
};

app.start({
	url: '/', 
	view: views.HomeView, 
	container: '.contents', 
	layout: 'DefaultLayout',
	pages: [
		boardsContents
	]
}, siteOption);


