# order-matter-validator

An object validator for Javascript ES6, validate your object by defining order-matter and extensible validation schema.

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Usage](#usage)
- [Order-matter schema ?](#order-matter-schema-)
- [Extensibility](#extensibility)
- [One-job rules](#one-job-rules)
- [Rules](#rules)
	- [defined](#defined)
	- [len](#len)
	- [minlen](#minlen)
	- [maxlen](#maxlen)
	- [min](#min)
	- [max](#max)
	- [pattern](#pattern)
	- [truthy](#truthy)
	- [type](#type)
- [Todos](#todos)

<!-- /TOC -->

## Usage

```js
const validate = require('order-matter-validator.js');

// extensible with custom rules
validate.use('unique-user', require('../utils/is-unique-username'));

// order-matter schema
const schema = [
  ['user', 'type', 'string', 'username must be a string'],
  ['user', 'minlen', 6, 'username must be at least 6 characters'],
  ['user', 'unique-user', 'username must be unique'] // using the custom rule
];

validate(object, schema, err => {
  if (err) {
    console.log(err.path); // field path
    console.log(err.value); // field value
    console.log(err.rule.name); // rule name
    console.log(err.rule.opts); // rule options
    console.log(err.rule.desc); // rule description
  } else {
    // err is null when no validation error
  }
});
```

## Order-matter schema

Why ? Let's consider a non-order-matter schema example below:

```js
const schema = {
  user: {
    type: 'string',
    minlen: 6,
    uniqueUser: true
  },
  pass: {
    type: 'string',
    minlen: 6
  }
}
```

So how the underground code know the order of validated fields (`user` and `pass` here) or the order of rules (`type`, `minlen` and `uniqueUser` here) ?

In other words, you want to validate `user` first, then `pass`; the rule `type` first before `minlen`, but how to present those things to the underground code ?

And remember, we can't rely on the order of object definition, just because the specification of JS doesn't specify that (read more: http://stackoverflow.com/a/5525812).

## Extensibility

This module only includes some basic built-in rules, they never be enough for our need.

To use a custom rule, for example, a rule that ensures an username is unique:

**is-unique-username.js:**
```js
/**
 * A rule impl should accept 3 parameters.
 * The first, the validated value.
 * The second, additional options.
 * The third, the callback.
 *
 * `cb(true)`` meaning the value is valid.
 * `cb(false)` meaning the value is invalid.
 *
 * That's it!
 */
module.exports = function (username, opts, cb) {
  User.findOne({username}, (err, user) => {
    if (err) throw err;
    cb(!user);
  })
}
```

**signup.js:**
```js
const validate = require('order-matter-validator.js');
validate.use('unique-user', require('../utils/is-unique-username'));

const schema = [
  ['user', 'unique-user', 'username must be unique']
];

validate({username: 'thenewvu'}, schema, (err) => {
  if (err) {
    // do something
  } else {
    // do something
  }
})
```

## One-job rules

Before talking about one-job rules, lets talk about more-than-one-job rules, for example, validating when users are updating their profile, clients sends only changed fields to the server and the server need to validate them:

```js
const schema = [
  ['phone', 'pattern', config.regex.phone, 'invalid phone number'],
  ['email', 'pattern', config.regex.email, 'invalid email']
];

validate(profile, schema, (err) => {
  // do something on err
})
```

The problem here is, only changed fields are sent to the server, therefore they're all optional and can be `undefined`, this makes the rule `pattern` can not validate `undefined` as an invalid value.

To solve this problem in a flexible way, all rules should have only one job. All rules should only validate the value if it matches some pre-condition, if it's not, just act as it's valid and let other rules does their job.

For example, these rules, `len`, `minlen` and `maxlen` only validates the value if it's an actual number; `pattern` only validates the value if it's a string, so on. If you want to validate the type of the field value, let the rule `type` does its job.

## Rules

### defined

Ensure a field is defined. It's defined only when it's not `undefined`. Even `null` is defined.

This rule has not opts, so just ignore it in the schema.

```js
const schema = [
  ['path.to.field', 'defined', 'description']
];
```

### len

Ensure the length of an array or a string equal to a given length.

If the value is not an array or a string, there's no validation error. If the field is mandatory, you should combine this rule with `type`.

```js
const schema = [
  ['path.to.field', 'type', 'array', 'description'],
  ['path.to.field', 'len', 3, 'description']
]
```

### minlen

Ensure the length of an array or a string respect a given minimum length.

If the value is not an array or a string, there's no validation error. If the field is mandatory, you should combine this rule with `type`.

```js
const schema = [
  ['path.to.field', 'type', 'string', 'description'],
  ['path.to.field', 'minlen', 6, 'description']
]
```

### maxlen

Ensure the length of an array or a string respect a given maximum length.

If the value is not an array or a string, there's no validation error. If the field is mandatory, you should combine this rule with `type`.

```js
const schema = [
  ['path.to.field', 'type', 'string', 'description'],
  ['path.to.field', 'maxlen', 30, 'description']
]
```

### min

Ensure a number respect a given minimum value.

If the value is not a number, there's no validation error. If the field is mandatory, you should combine this rule with 'type'.

```js
const schema = [
  ['path.to.field', 'type', 'number', 'description'],
  ['path.to.field', 'min', 13, 'description']
]
```

### max

Ensure a number respect a given maximum value.

If the value is not a number, there's no validation error. If the field is mandatory, you should combine this rule with 'type'.

```js
const schema = [
  ['path.to.field', 'type', 'number', 'description'],
  ['path.to.field', 'max', 100, 'description']
]
```

### pattern

Ensure a string respect a given pattern.

If the value is not a string,  there's no validation error. If the field is mandatory, you should combine this rule with 'type'.

The pattern can be a literal regexp (`/^\w+$/`) or a RegExp instance (`new RegExp('^\\w+$')`).

```js
const schema = [
  ['path.to.field', 'type', 'string', 'description'],
  ['path.to.field', 'pattern', /^\w+$/, 'description']
]
```

### truthy

Ensure a value is truthy.

A value is truthy if it's not one of below values:

* `false`
* `0` (zero)
* `""` (empty string)
* `null`
* `undefined`
* `NaN` (a special Number value meaning Not-a-Number!)
* `[]` (empty array)

This rule has no opts, just ignore it in the schema.

```js
const schema = [
  ['path.to.field', 'truthy', 'description'],
]
```

### type

Ensure a value has a type.

The type of the value will be evaluated by `typeof` operator.

Below are supported types:

* `number`
* `string`
* `function`
* `symbol`
* `undefined`
* `object`

```js
const schema = [
  ['path.to.field', 'type', 'number', 'description']
]
```

## Todos

- [x] Add `in` rule
- [x] Throw if rule opts is invalid
- [ ] Add `nin` rule
