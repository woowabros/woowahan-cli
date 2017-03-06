module.exports = function(fileName, config, templateName) {
  var templateKey = tranformStrToCamelCase(fileName);
  var templateKeyPrefix = config.type ? config.type : config.generate;

  templateKey = templateKeyPrefix + templateKey;
  if (!!templateName) {
    templateKey = templateName;
  }
  
  return templates[templateKey] ? templates[templateKey](config.name, config.actionName) : '';
};

var templates = {
  exportActionJs: function(name) {
    return `export const ${name} = '${name}';
`;
  },
  exportJs: function(viewName) {
    return `export * from './${viewName}';
`;
  },
  reducerJs: function(name, actionName) {
    return `
import Woowahan from 'woowahan';
import { successHandler, failHandler, ajax } from './toolbox';
import { ${actionName ? actionName : '/** ActionName **/' } } from '../actions';

export const ${name} = Woowahan.Reducer.create(${actionName ? actionName : '/** ActionName **/' }, function(options) {
  this.use(Woowahan.Reducer.SUCCESS, successHandler);
  this.use(Woowahan.Reducer.FAIL, failHandler);

  this.onSuccess = function(response) {
    this.finish(null, response);
  };

  ajax.get(this, 'https://jsonplaceholder.typicode.com/posts');
  // ajax.get()
  // ajax.put()
  // ajax.post()
  // ajax.delete()
});
`;
  },
  defaultIndexJs: function(viewName) {
    return `import Woowahan from 'woowahan';
import Template from './index.hbs';

export const ${viewName} = Woowahan.View.create('${viewName}', {
  template: Template,
  events: {
    // ex> 'click #clickButton': 'onClickEventFire'
  },
  initialize() {
    this.super();
  },
  viewWillMount(renderData) {
    
    // Do Something.
    // you can modify the renderData, it will pass into the template.
    // ex> renderData.title = 'Woowahan CLI App.'
    // ex> renderData.body = 'Woowahan Bros.'

    return renderData;
  },
  viewDidMount($el) {
    // $el : jQuery Object.
    // ex> $el.find(selector).doSomthing;
  },
  viewWillUnmount() {

  }
});
`;
  },
  defaultIndexHbs: function(viewName) {
  return `<!-- 
  *********************************************************************************************
  Using handlebars to make complex dynamic content and templates. more details http://handlebarsjs.com/
  *********************************************************************************************
-->
<div>
  <h1>${viewName} Default View</h1>

  <!--
    <h1>{{title}}</h1>
      <div class="body">
        {{body}}
      </div>
    </div>
  -->
<div>
`;
  },
  collectionIndexJs: function(viewName) {
    return `import Woowahan from 'woowahan';
import Template from './index.hbs';
import RowItemView from './row-item';

export const ${viewName} = Woowahan.CollectionView.create('${viewName}', {
  template: Template,
  rowContainer: '.list',
  rowView: RowItemView,
  events: {
    // ex> 'click #clickButton': 'onClickEventFire'
  },
  initialize() {
    this.super();
  },
  viewWillMount(renderData) {
    
    // Do Something.
    // you can modify the renderData, it will pass into the template.
    // ex> renderData.title = 'Woowahan CLI App.'
    // ex> renderData.body = 'Woowahan Bros.'

    return renderData;
  },
  viewDidMount($el) {
    // $el : jQuery Object.
    // ex> $el.find(selector).doSomthing;
  },
  viewWillUnmount() {

  }
});
`;
  },
  collectionIndexHbs: function(viewName) {
  return `<!-- 
  *********************************************************************************************
  Using handlebars to make complex dynamic content and templates. more details http://handlebarsjs.com/
  *********************************************************************************************
-->
<div>
  <h1>${viewName} Collection View</h1>
  <p> rowContainer </p>
  <!--
    <ul class="list"></ul> 
  -->
<div>
`;
  },
  collectionRowItemIndexJs: function(viewName) {
    return `import Woowahan from 'woowahan';
import Template from './index.hbs';

export default Woowahan.ItemView.create('ItemView', {
  template: Template,
  events: {
    // ex> 'click #clickButton': 'onClickEventFire'
  },
  initialize() {
    this.super();
  },
  viewWillMount(renderData) {
    
    // Do Something.
    // you can modify the renderData, it will pass into the template.
    // ex> renderData.title = 'Woowahan CLI App.'
    // ex> renderData.body = 'Woowahan Bros.'

    return renderData;
  },
  viewDidMount($el) {
    // $el : jQuery Object.
    // ex> $el.find(selector).doSomthing;
  },
  viewWillUnmount() {

  }
});
`;
  },
  collectionRowItemIndexHbs: function(viewName) {
  return `<!-- 
  *********************************************************************************************
  Using handlebars to make complex dynamic content and templates. more details http://handlebarsjs.com/
  *********************************************************************************************
-->

<!--
  <li>Collection Item {data}</li>
-->
`;
  }
};

function tranformStrToCamelCase(str) {
  var transformedString = str.replace(/([^A-Z0-9]+)(.)/ig, function(match, p1, p2, p3) { 
      return p2.toUpperCase();
    }
  );

  return transformedString.charAt(0).toUpperCase() + transformedString.slice(1);
}
