# broccoli-i18n-template

Broccoli filter that prefix relaive i18n keys in templates with relative path of template. 
 
Provides Rails style *"Lazy" loading* of i18n translation keys, but compile time!
 
Loosely based on [broccoli-template](https://github.com/joliss/broccoli-template/)

## Installation

```bash
npm install --save-dev broccoli-i18n-template
```

## Usage Example

```js
var filterI18nTemplates = require('broccoli-i18n-template');
tree = filterI18nTemplates(tree);
```

Advanced options config:

```js
var filterI18nTemplates = require('broccoli-i18n-template');
tree = filterI18nTemplates(tree, {
  extensions: ['hbs', 'handlebars'],
  compileFunction: 'Ember.Handlebars.compile'
});
```

Given a file `template.hbs`

```handlebars
"sdfds {{t '.buttons.list'}} hello {{t \".buttons.print\"}}  {{t 'xup.xyau'}}"
```

this function will emit a template string where relative i18n keys are resolved using the relative path of template:

Imagine we have a template at `bookings/edit.hbs`

```js
"sdfds {{t 'bookings.edit.buttons.list'}} hello {{t \"bookings.edit.buttons.print\"}}  {{t 'xup.xyau'}}"
```

It can also handle the format `bookings--edit.hbs` (since handlebars < 2.0 doesn't support nested templates or template names with `"/"`)  

### Options

#### extensions (optional)

A list of file extensions that this template filter applies to.

default is `['hbs', 'handlebars']

#### compileFunction (optional)

Compile function (default is 'Ember.Handlebars.compile'`)
