const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './.env' });
const port = process.env.PORT;
const mongoDBConnect = require('./mongoDBConnect');
app.set('view engine', 'ejs');

const checkoutRouter = require('./routes/checkout');
const shopItemsRouter = require('./routes/shopItems');
const categoriesRouter = require('./routes/categories');
const authRouter = require('./routes/auth');
const startRouter = require('./routes/start');
const usersRouter = require('./routes/users');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  let origins = [
    process.env.WEB_APP_URL,
    process.env.LOCAL_WEB_APP_URL
  ];

  for(let i = 0; i < origins.length; i++){
    let origin = origins[i];

    if(req.headers.origin.indexOf(origin) > -1){
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser());

mongoDBConnect();

app.use(
  startRouter,
  checkoutRouter,
  categoriesRouter,
  shopItemsRouter,
  authRouter,
  usersRouter,
);

app.listen(port, () => {
  console.log(`Server start on port: ${port}`);
});
