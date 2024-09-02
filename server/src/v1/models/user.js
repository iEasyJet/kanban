const mogoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const userSchema = new mogoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  schemaOptions
);

module.exports = mogoose.model('User', userSchema);
