const {DataTypes} = require("sequelize")
const {sequelize} = require("../config/database")

const User = sequelize.define("User",{
    name:{
        type:DataTypes.STRING,
    },
    username:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    birthday:{
        type:DataTypes.DATEONLY
    },
    profilePic:{
        type:DataTypes.STRING
    }

})

module.exports = (sequelize, DataTypes) => {
    return User
}