module.exports = function(config) {
	var viewName = config.name;
	
	return `<!-- 
  Using handlebars to make complex dynamic content and templates. more details http://handlebarsjs.com/
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
};
