'use strict';

// const { where } = require("sequelize/types");

// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class DataCollection {

  constructor(model) {
    this.model = model;
  }

 async get(id) {

   try{
     
     if (id) {

       const getData=await this.model.findOne({ where:{id }});
       return getData;

     }else {
       return await this.model.findAll({});
     }
   }catch(err){
     console.error("err",this.model.name,`${id}`);
   }

   }

  async create(record) {
    try{
      return await this.model.create(record);
    }catch(err){
      console.error("err",this.model.name);
    }
  }

  async update(id, data) {
    try{
      
      let locatedRecord =await this.model.findOne({ where: { id } })
      let updated=await locatedRecord.update(data);
      return updated;
    }catch(err){

    }
  }

  async delete(id) {
    if(!id){ 
      throw new Error("err",this.model.name);
    }
    try{
      let deleted=await this.modal.destroy({where:{id}});
      return `${id}`;

    } catch(err){
      console.error("err",this.model.name,`${id}`);
    }

  }

}

module.exports = DataCollection;
