const express = require('express');

const { getUsers, updateUser } = require('./../controller/usersController');

const usersRouter = express.Router();

usersRouter.get('/users', getUsers);
usersRouter.put('/users/:id', updateUser);

module.exports = usersRouter;
