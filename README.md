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
const validate = require('order-matter-validator');

/**
 * Extend with a custom rule.
 */
validate.use('unique-user', require('../utils/is-unique-username'));

/**
 * Order-matter schema
 */
const schema = [
  ['user', 'type', 'string', 'username must be a string'],
  ['user', 'minlen', 6, 'username must be from 6 characters'],
  ['user', 'unique-user', 'username must be unique'] // using the custom rule
];

/**
 * Validate some object
 */
validate(obj, schema, err => {
  console.log(err); // null if no validation error
  console.log(err.path); // the invalidated path
  console.log(err.value); // the invalidated value
  console.log(err.rule.name); // the rule name
  console.log(err.rule.opts); // the rule opts
  console.log(err.rule.desc); // the rule desc
});
```

## Order-matter schema ?

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

So how the underground code know the order of validated fields (`user` and `pass` here) or the order of validated rules (`type`, `minlen` and `uniqueUser` here) ?

In other words, you want to validate `user` first, then `pass`; the rule `type` first before `minlen`, but how to present those things to the underground code ?

And remember, we can't rely on the order of object definition, just because the specification of JS doesn't specify that (read more: http://stackoverflow.com/a/5525812).

## Extensibility

This package only includes some basic built-in validation rules, they never be enough for our need.

To extend with a custom rule, for example, a rule that ensures an username is unique:

**is-unique-username.js:**
```js
const User = require('../models/user');

/**
 * A rule impl should accept 3 parameters.
 * The first, the validated value.
 * The second, additional options.
 * The third, the callback.
 *
 * `cb(true)`` means the value is valid.
 * `cb(false)` means the value is invalid.
 *
 * That's it!
 */
module.exports = function (username, opts, cb) {
  User.findOne({username}, (err, user) => {
    if (err) throw err;
    cb(!!user);
  })
}
```

**signup.js:**
```js
const validate = require('order-matter-validator');
validate.use('unique-user', require('../utils/is-unique-username'));

const schema = [
  ['user', 'unique-user', 'username must be unique']
];
```

## One-job rules

Before talking about one-job rules, lets talk about more-than-one-job rules, for example, validating when users update their profile, clients sends only changed fields to the server and the server need to validate them:

```js
const schema = [
  ['phone', 'pattern', config.regex.phone, 'invalid phone number'],
  ['email', 'pattern', config.regex.email, 'invalid email']
];

validate(profile, schema, (err) => {
  // do something on err
})
```

The problem here is, only changed fields are sent to the server, means they're all optional, they can be `undefined`, this makes the rule `pattern` can not return `false` if it meets an `undefined` value. That's where one-job rules comes to play.

All rules should only validate the value if it matches some pre-condition, if it's not, just return `true`. For example, `len`, `minlen` and `maxlen` only validates the value if it's an actual number; `pattern` only validates the value if it's a string, so on.

If you want to validate the type of the value, let's `type` do its job:

```js
const schema = [
  ['age', 'type', 'number', 'invalid age'],
  ['age', 'min', 13, 'age below 13 is not allowed']
]
```

## Rules

### defined

Ensure a field is defined.

This rule has not opts, so just ignore it in the schema.

```js
const schema = [
  ['path.to.field', 'defined', 'description']
];
```

### len

Ensure the length of an array or a string equal to a given length.

If the value is not an array or a string, there's no invalidation error. If the field is mandatory, you should combine this rule with `type`.

```js
const schema = [
  ['path.to.field', 'type', 'array', 'description'],
  ['path.to.field', 'len', 3, 'description']
]
```

### minlen

Ensure the length of an array or a string respect a  given minimum length.

If the value is not an array or a string, there's no invalidation error. If the field is mandatory, you should combine this rule with `type`.

```js
const schema = [
  ['path.to.field', 'type', 'string', 'description'],
  ['path.to.field', 'minlen', 6, 'description']
]
```

### maxlen

Ensure the length of an array or a string respect a  given maximum length.

If the value is not an array or a string, there's no invalidation error. If the field is mandatory, you should combine this rule with `type`.

```js
const schema = [
  ['path.to.field', 'type', 'string', 'description'],
  ['path.to.field', 'maxlen', 30, 'description']
]
```

### min

Ensure a number respect a given minimum value.

If the value is not a number, there's no invalidation error. If the field is mandatory, you should combine this rule with 'type'.

```js
const schema = [
  ['path.to.field', 'type', 'number', 'description'],
  ['path.to.field', 'min', 13, 'description']
]
```

### max

Ensure a number respect a given maximum value.

If the value is not a number, there's no invalidation error. If the field is mandatory, you should combine this rule with 'type'.

```js
const schema = [
  ['path.to.field', 'type', 'number', 'description'],
  ['path.to.field', 'max', 100, 'description']
]
```

### pattern

Ensure a string respect a given pattern.

If the value is not a string,  there's no invalidation error. If the field is mandatory, you should combine this rule with 'type'.

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

- [ ] Add `range` rule
- [ ] Add `enum` rule
