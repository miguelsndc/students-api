const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
const studentsRoute = require('./routes/students')

app.use(express.json())
app.use('/students', studentsRoute)

app.get('/', (_, res) => {
  res.json({
    message: 'Response',
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

mongoose
  .connect(
    'mongodb+srv://admin:123123123@cluster0.wloff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  .then(conn => {
    console.log(`Connected at ${conn.Connection.name}`);
  });
