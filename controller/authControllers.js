const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const maxAge = 5 * 24 * 60 * 60;

const createJWT = (id) => {
  return jwt.sign({ id }, 'three_js secret', {
    expiresIn: maxAge,
  })
};

const showError = (err) => {
  let errors = { name: '', email: '', password: '' };

  if (err.message === 'incorrect email') {
    errors.email = 'This email not found';
  }
  if (err.message === 'incorrect password') {
    errors.password = 'The password is incorrect';
  }
  if (err.code === 11000) {
    errors.email = 'This email already exist';
    return errors;
  }
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors;
};

const signupController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = createJWT(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user, jwt: token });
  } catch (error) {
    let errors = showError(error);
    res.status(400).json({ errors });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createJWT(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user, jwt: token });
  } catch (error) {
    let errors = showError(error);
    res.status(400).json({ errors });
  }
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'three_js secret', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        let user = await User.findById(decodedToken.id);
        res.json(user);
        next();
      }
    })
  } else {
    next();
  }
};

const logoutController = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ logout: true });
};

module.exports = { signupController, loginController, verifyUser, logoutController };