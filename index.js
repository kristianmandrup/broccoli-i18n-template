var Filter = require('broccoli-filter');

// TODO: Perhaps use [broccoli-replace](https://github.com/outaTiME/broccoli-replace)

module.exports = TemplateI18nFilter;
TemplateI18nFilter.prototype = Object.create(Filter.prototype);
TemplateI18nFilter.prototype.constructor = TemplateI18nFilter;
function TemplateI18nFilter (inputTree, options) {
  if (!(this instanceof TemplateI18nFilter)) return new TemplateI18nFilter(inputTree, options);
  this.inputTree = inputTree;
  this.i18nExpr = options.i18nExpr || /{{\s*t\s*['|"](\.)/
  this.extensions = options.extensions || ['hbs', 'handlebars'];
}

TemplateI18nFilter.prototype.targetExtension = 'hbs';

var insert = function(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

var scan = function(original, regex, replacer) {
  if (!regex.global) throw "regex must have 'global' flag set";
  return original.replace(regex, function(match, matches, offset, string) {
    console.log(match, matches, offset, string);
    return match.replace(/\./, replacer(match));
  });
};

TemplateI18nFilter.prototype.processString = function (string, relativePath) {  
  return scan(string, this.i18nExpr, replacement(relativePath));
};

function replacement(relativePath) {
  var dotPath = relativePath.replace(/[\/|\\]/, '.').replace('--', '.');
  return function(match) {
    return dotPath + '.';
  }
}
