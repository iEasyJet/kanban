const mogoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const sectionSchema = new mogoose.Schema(
  {
    user: {
      type: mogoose.Schema.ObjectId,
      ref: 'Board',
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
  schemaOptions
);

module.exports = mogoose.model('Section', sectionSchema);
