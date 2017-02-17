import Woowahan from 'woowahan';
import DefaultLayout from './layouts/default';
import * as views from './views';
import * as reducers from './reducers';

global.$ = global.jQuery = Woowahan.$;

const app = new Woowahan();

app.use(Woowahan.Layout('#app', DefaultLayout));
app.use(reducers);

const routes = {
  url: '/', view: views.HomeView, container: '.contents', layout: 'DefaultLayout', pages: [
    { url: 'posts', view: views.PostsView }
  ]
};

app.start(routes);
