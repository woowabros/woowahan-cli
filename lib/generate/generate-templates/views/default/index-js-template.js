module.exports = function(config) {
	var viewName = config.name;
	
	return `import Woowahan from 'woowahan';
import Template from './index.hbs';

/**
events:{
  'eventName DOM-Selector': 'EventHandler',
  'click #clickButton': 'onClickEventFire'
},
이벤트 관련 상세 정보 :
https://github.com/woowabros/WoowahanJS/blob/master/docs/event.md
*/

export const ${viewName} = Woowahan.View.create('${viewName}', {
  template: Template,
  events: {
  },
  initialize() {
    // .. write your code
    this.super();
  },
  viewWillMount(renderData) {
    // renderData.title = 'Woowahan CLI App.';
    // renderData.body = 'Woowahan Bros.';
    // ... write your code

    return renderData;
  },
  viewDidMount($el) {
  },
  viewWillUnmount() {
  }
});
`;
};
