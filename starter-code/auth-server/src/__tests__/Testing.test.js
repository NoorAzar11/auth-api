'use strict';

const supertest = require('supertest');
const server = require('../server');
const { db } = require('../auth/models/index');

const mockRequest = supertest(server.server);

let users = {
  admin: { username: 'admin', password: 'password' },
  editor: { username: 'editor', password: 'password' },
  user: { username: 'user', password: 'password' },
  writer: { username: 'writer', password: 'password' }
};

describe('Testing Auth', () => {

  Object.keys(users).forEach(userType => {

    describe(`${userType} Testing Users`, () => {

      it('Testing Creating', async (done) => {

        const response = await mockRequest.post('/signup').send(users[userType]);
        const userObject = response.body;

        expect(response.status).toBe(201);
        expect(userObject.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username)
        done();
      });

      it('Testing Basic', async (done) => {

        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);

        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username)
        done();
      });

      it('Testing bearer', async (done) => {

    
        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);

        const Testingtoken = response.body.token;

    
        const bearerResponse = await mockRequest
          .get('/users')
          .set('Authorization', `Bearer ${Testingtoken}`)

        
        expect(bearerResponse.status).toBe(200);
        done();
      });

    });

    describe('Testing Login', async () => {

      it('tesing login', async (done) => {

        const response = await mockRequest.post('/signin')
          .auth('admin', 'kjh')
        const userObject = response.body;

        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined();
        done();
      });

      it('Testing Users ', async (done) => {

        const response = await mockRequest.post('/signin')
          .auth('Nothing', 'mko')
        const userObject = response.body;

        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined()
        done();
      });

      it('Testing Bearer response ', async (done) => {

        const TesingbearerResponse = await mockRequest
          .get('/users')
          .set('Authorization', `Bearer foobar`)

        expect(TesingbearerResponse.status).toBe(403);
        done();

      })
    })

  });

});