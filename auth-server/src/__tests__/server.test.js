'use strict';



const server = require('../src/server');
const supertest = require('supertest');
const {  response } = require('express');
const request = supertest(server.server);

describe('Testing my API', () => {

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation();
    })


    it('Testing API get data', () => {
        const response = request.get('/food').then(response=>{
          expect(response.status).toEqual(200);
          expect(typeof response.body).toEqual('object'); 
        }); 
        
    });


    it('Testing creating new data', () => {
        const response = request.post('/food/1')
        .then((response)=>{ expect(response.status).toEqual(200)})

      });

      it('Testing update', () => {
        const Updated = request.put('/food/1')
        .then((response)=>{ expect(response.status).toEqual(200)})
     
      });
      
      it('Testing delete', () => {
        const deleteRecord = request.delete('/food/1')
        .then((response)=>{ expect(response.status).toEqual(202)})
     
      });
  
});