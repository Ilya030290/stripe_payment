const express = require('express');

const {
  signupController,
  loginController,
  logoutController,
  verifyUser,
} = require('./../controller/authControllers');

const authRouter = express.Router();

authRouter.post('/signup', signupController);
authRouter.post('/login', loginController);
authRouter.delete('/logout', logoutController);
authRouter.get('/verify-user', verifyUser);

module.exports = authRouter;
