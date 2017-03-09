import Woowahan from 'woowahan';
import template from './index.hbs';

export const HomeView = Woowahan.View.create('HomeView', {
  template,
  events: {

  },
  initialize() {
		this.super();
  },
  viewWillMount(renderData) {
    let routeTables = this.getRouteTables();

    renderData.routePath = {};
    Object.keys(routeTables).forEach((view) => {
      renderData.routePath[view] = routeTables[view]({ filter: 'draft' });
    });
    
		return renderData;
  },
  viewDidMount($el) {

  },
  viewWillUnmount() {

  }
});
