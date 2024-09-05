const mogoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const taskSchema = new mogoose.Schema(
  {
    section: {
      type: mogoose.Schema.ObjectId,
      ref: 'Section',
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    position: {
      type: Number,
    },
  },
  schemaOptions
);

module.exports = mogoose.model('Task', taskSchema);
