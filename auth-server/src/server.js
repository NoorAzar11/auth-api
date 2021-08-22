'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//added v1 and v2
const v1path=require('./auth/routes/v1');
const v2path=require('./auth/routes/v2')


// Esoteric Resources
const errorHandler = require('./error-handlers/500')
 const notFound = require('./error-handlers/404');
const authRoutes = require('./auth/routes/routes.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


///adding home route 
app.get('/',(req, res) => {
  res.send('welcome to home page')
});

//added to use
app.use('/Api/v1',v1path);
app.use('/Api/v2',v2path);

// Routes
app.use(authRoutes);

// Catchalls
 app.use(notFound);
 app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
