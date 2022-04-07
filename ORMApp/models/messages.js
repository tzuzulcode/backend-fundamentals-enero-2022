'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Messages.hasOne(models.User,{foreignKey:"id",as:"sender"})
      // Messages.hasOne(models.User,{foreignKey:"id"})
    }
  }
  Messages.init({
    idSender: DataTypes.INTEGER,
    idReceiver: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};