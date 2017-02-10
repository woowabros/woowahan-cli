import Woowahan from 'woowahan';
import LayoutView from './layouts/layout';
import HomeView from './views/home';
import PostsView from './views/posts';
import Posts from './reducers/posts';

global.$ = global.jQuery = Woowahan.$;

const app = new Woowahan();

app.use(Posts);

app.use(Woowahan.Layout('#app', LayoutView));

app.start({
  url: '/',
  container: '.contents',
  layout: 'LayoutView',
  view: HomeView,
  pages: [
  	{ url: '/posts', view: PostsView },
  ]
});
