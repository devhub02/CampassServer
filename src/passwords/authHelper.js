const bcrypt = require("bcrypt");

// hash function
exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          }

          resolve(hash);
        });
      }
    });
  });
};

// compare function
exports.comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
