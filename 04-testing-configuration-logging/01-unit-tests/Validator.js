module.exports = class Validator { // 
  constructor(rules) {
    this.rules = rules;
  }

  validate(obj) {
    const errors = [];

    for (const field of Object.keys(obj)) {
    // for (const field of Object.keys(this.rules)) {
      const rules = this.rules[field];

      const value = obj[field];
      const type = typeof value;

      if (type !== rules.type) {
        errors.push({field, error: `expect ${rules.type}, got ${type}`});
        continue;
      }

      switch (type) {
        case 'string':
          if (value.length < rules.min) {
            errors.push({field, error: `too short, expect ${rules.min}, got ${value.length}`});
          }
          if (value.length > rules.max) {
            errors.push({field, error: `too long, expect ${rules.max}, got ${value.length}`});
          }
          break;
        case 'number':
          if (value < rules.min) {
            errors.push({field, error: `too little, expect ${rules.min}, got ${value}`});
          }
          if (value > rules.max) {
            errors.push({field, error: `too big, expect ${rules.min}, got ${value}`});
          }
          break;
      }
    }

    return errors;
  }
};

// const validator = new Validator({
//   name: {
//     type: 'string',
//     min: 5,
//     max: 10, 
//   },
//   age: {
//     type: 'number',
//     min: 18,
//     max: 27,
//   }
// });

// console.log(validator.validate({ name: 1}))
