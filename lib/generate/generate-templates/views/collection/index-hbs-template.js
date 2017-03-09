module.exports = function(viewName) {
  return `{{!-- 
  Using handlebars to make complex dynamic content and templates. more details http://handlebarsjs.com/
--}}
<div>
  <h1>${viewName} Collection View</h1>
  <p> rowContainer </p>
  {{!-- 
  <ul class="list"></ul> 
  --}}
<div>
`;
};
