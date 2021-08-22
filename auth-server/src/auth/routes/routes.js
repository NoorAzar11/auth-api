'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index');
const basicAuth = require('../middleware/basic.js')
const bearerAuth = require('../middleware/bearer.js')
const permissions = require('../middleware/acl.js')
const aclreq = require('../middleware/acl')


authRouter.post('/signup', async (req, res, next) => {
  try {

    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };

    res.status(201).json(output);
  } catch (e) {

    next(e.message)

  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {

    user: req.user,
    token: req.user.token

  };

  res.status(200).json(user);
});


authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);

  res.status(200).json(list);

});

///////////////////////////////////////////

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area')
});


///////////////////////////////////middlewares have req,res 
authRouter.patch('/API', bearerAuth, async (req, res, next) => {
  res.status(200).send('Testing Patching')
});

authRouter.get('/API', bearerAuth, aclreq("read") ,  (req, res) => {
   res.send('TTesing reading ');
});

authRouter.post('/API', bearerAuth, aclreq("create") , (req, res) => {
  res.send('Testing creating')
});

authRouter.put('/API', bearerAuth, aclreq("update") ,  (req, res) => {
   res.send('Testing Updating')
});

authRouter.delete('/API', bearerAuth, aclreq("delete") ,  (req, res) => {
   res.send('Testing deleting')
});


module.exports = authRouter;
