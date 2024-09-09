const mogoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const boardSchema = new mogoose.Schema(
  {
    user: {
      type: mogoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    icon: {
      type: String,
      default: '📖',
    },
    title: {
      type: String,
      default: 'Без названия...',
    },
    description: {
      type: String,
      default: `Сюда можно добавить многострочное описание.
      Если все понятно, тогда вперед!`,
    },
    position: {
      type: Number,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    favoritePosition: {
      type: Number,
      default: 0,
    },
  },
  schemaOptions
);

module.exports = mogoose.model('Board', boardSchema);
