module.exports = function(viewName) {
	return `import Woowahan from 'woowahan';
import Template from './index.hbs';
import RowItemView from './row-item';

export const ${viewName} = Woowahan.CollectionView.create('${viewName}', {
  template: Template,
  rowContainer: '.list',
  rowView: RowItemView,
  events: {
    
  },
  initialize() {
    // this.setModel({
    //   list: [
    //     {
    //       userId: 1,
    //       name: 'James',
    //       age: 19
    //     },
    //     {
    //       userId: 2,
    //       name: 'Tom',
    //       age: 21
    //     }
    //   ]
    // });
    // .. write your code
    this.super();
  },
  viewWillMount(renderData) {
    // .. write your code
    return renderData;
  },
  viewDidMount($el) {
    // this.reload(this.getModel('list'), { uid: 'userId', reset: true, reverse: false } )
    // .. write your code
  },
  viewWillUnmount() {
    // .. write your code
  }
});
`;
};
