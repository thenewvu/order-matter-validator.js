# order-matter-validator

An object validator for Javascript ES6, validate your object by defining order-matter, powerful and extensible validation schema.

## The first look

```javascript
const validate = require('order-matter-validator');
const isUniqueUser = require('../utils/is-unique-user');

validate.use('unique-user', isUniqueUser);

const schema = [
  ['user', 'type', 'string', 'username must be a string'],
  ['user', 'minlen', 6, 'username must be from 6 characters'],
  ['user', 'unique-user', 'username must be unique'],
  ['pass', 'type', 'string', 'password must be a string'],
  ['pass', 'minlen', 6, 'password must be from 6 characters'],
  ['age', 'type', 'number', 'age must be a number'],
  ['age', 'min', 13, 'age must be greater than 13'],
  ['email', 'type', 'string', 'email must be a string'],
  ['email', 'pattern', config.regex.email, 'email must be well form']
];
validate(obj, schema, err => {
  
});
```

## Order-matter

Why order-matter ? Simple as this, for example, you want to check a field of the validating object has to be present first before checking whether it is a string or not; or you want to check some field first before checking other fields. And in fact that, we mostly all need order-matter validation, just look at some real life problems below:

- Should check the presence of `username` first, before the presence of `password`.
- Should check the type of `age` field first, before the minimum of `age`.

## Extensible

This package should allow you extend its built-in schema. Though it's flexible already, but who know ? Maybe, sometime, you need a really special and beyond-of-predictable validator that I never think about it before.

So here you go:

```javascript
const validate = require('order-matter-validator');
const newrule = require('./rules/newrule')

validate.use('newrule', newrule);
const schema = [['field', 'newrule', 'rule-args', 'newrule-desc']];
validate(someobj, schema);
```
