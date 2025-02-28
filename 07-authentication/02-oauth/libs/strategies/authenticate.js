const User = require('../../models/User');

module.exports = async function authenticate(strategy, email, displayName, done) {
  try {
    if (!email) return done(null, false, 'Не указан email');

    const user = await User.findOne({email: email});

    if (!user) {
      const newUser = new User({
        email: email,
        displayName: displayName,
      });
      await newUser.save();
      return done(null, newUser);
    }

    return done(null, user);
  } catch (err) {
    done(err);
  }
};
