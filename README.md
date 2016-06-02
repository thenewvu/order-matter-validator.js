# order-matter-validator

An object validator for Javascript ES6, validate your object by defining order-matter, one-job and extensible validation schema.

## The first look

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

So how the underground code know the order of field validation (`user` and `pass` here) or the order of validated rules (`type`, `minlen` and `uniqueUser` here) ?

In other words, you want validate `user` first, then `pass`; the rule `type` first before `minlen`, but how to present those things to the underline code ?

And remember, we can't rely on the order of object definition, just because the specification of JS doesn't specify that (read more: http://stackoverflow.com/a/5525812).

## Extensibility

This package only includes some basic built-in validation rules, they never be enough for our need.

To extend a custom rule, for example, a rule that returns an username is unique or not:

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
