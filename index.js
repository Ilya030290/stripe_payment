const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './.env' });
const port = process.env.PORT;
const mongoDBConnect = require('./mongoDBConnect');

const checkoutRouter = require('./routes/checkout');
const shopItemsRouter = require('./routes/shopItems');
const categoriesRouter = require('./routes/categories');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.WEB_APP_URL,
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(cookieParser());

mongoDBConnect();

app.use(
  checkoutRouter,
  categoriesRouter,
  shopItemsRouter,
  authRouter,
  usersRouter
);

app.listen(port, () => {
  console.log(`Server start on port: ${port}`);
});
