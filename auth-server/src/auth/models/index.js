'use strict';


require('dotenv').config();
const userModel = require('./users');
const { Sequelize, DataTypes } = require('sequelize');
const foodscehma=require('./food/model');
const clothsechma=require('./clothes/model');
const collectionDa=require('./data-collection');

let sequelizeOptions ={

  dialectOptions: {

    ssl: {

      require: true,
      
      rejectUnauthorized: false,
    }
  }

};

const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost:5432/noor";
const sequelize = new Sequelize(DATABASE_URL,sequelizeOptions);

const Food=foodscehma(sequelize, DataTypes);

const clothes=clothsechma(sequelize, DataTypes);


module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  food:new collectionDa(Food),
  clothes: new collectionDa(clothes),
}
