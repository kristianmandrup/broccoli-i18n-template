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
  i18nExpr: /t\s*['|"](\.)/
});
```

Imagine we have a template at `bookings/edit.hbs`

```handlebars
something {{t '.buttons.list'}} hello {{t ".buttons.print"}}  {{t 'blip.plap'}}
```

This filter/transformer will emit a template string where relative i18n keys are resolved using the relative path of template:

```handlebars
something {{t 'bookings.edit.buttons.list'}} hello {{t "bookings.edit.buttons.print"}}  {{t 'blip.blap'}}
```

It can also handle the format `bookings--edit.hbs` (since handlebars < 2.0 doesn't support nested templates or template names with `"/"`)  

### Options

#### extensions (optional)

A list of file extensions that this template filter applies to.

default is `['hbs', 'handlebars']`

#### i18nExpr (optional)

Expression used to match and replace

default is `/{{\s*t\s*['|"](\.)/`


## TODO

Perhaps use or extend [broccoli-replace](https://github.com/outaTiME/broccoli-replace)