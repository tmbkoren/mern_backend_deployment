const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

//mongodb+srv://tmbkoren_:YC5giHqlR0Vhij7y@cluster0.hvmsolc.mongodb.net/?retryWrites=true&w=majority

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/places', placesRoutes);

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

// app.use((err, req, res, next) => {
//   if (req.file) {
//     console.log('file: ', req.file);
//     fs.unlink(req.file.location, (err) => {
//       console.log(err);
//     });
//   }
//   if (res.headerSent) {
//     return next(err);
//   }
//   res
//     .status(err.status || 500)
//     .json({ message: err.message || 'An unknown error occured!' });
// });

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hvmsolc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => app.listen(5000))
  .catch((err) => console.log(err));
