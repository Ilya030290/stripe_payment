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
const modelsRouter = require('./routes/models');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(cookieParser());

mongoDBConnect();

app.use(
  startRouter,
  checkoutRouter,
  categoriesRouter,
  shopItemsRouter,
  authRouter,
  usersRouter,
  modelsRouter
);

app.listen(port, () => {
  console.log(`Server start on port: ${port}`);
});
