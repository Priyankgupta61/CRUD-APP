const express = require('express');
const app = express();
const connectdb = require('./authdatabase/db.js');
const dotenv = require('dotenv');
const authRoute = require('./authroutes/Routes.js');
const cookieparser = require('cookie-parser');
const cors = require('cors');

dotenv.config({ path: './config/config.env' });

app.use(
  cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectdb();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`This is in ${PORT} mode`);
});

app.use('/api', authRoute);
