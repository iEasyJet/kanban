const User = require('../models/user');
const CryptoJS = require('crypto-js');
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { NODE_ENV, PASSWORD_SECRET_KEY, SIMPLE_SECRET_KEY, TOKEN_SECRET_KEY } =
  process.env;

function createToken(userID) {
  return jsonwebtoken.sign(
    { id: userID },
    NODE_ENV === 'production' ? TOKEN_SECRET_KEY : SIMPLE_SECRET_KEY,
    { expiresIn: '7d' }
  );
}

exports.register = async (req, res) => {
  const { username, password } = req.body;
  let newPassword;
  try {
    newPassword = CryptoJS.AES.encrypt(
      password,
      NODE_ENV === 'production' ? PASSWORD_SECRET_KEY : SIMPLE_SECRET_KEY
    );

    await User.create({ username, password: newPassword });
    const userData = await User.findOne({ username });

    const token = createToken(userData._id.toString());
    console.log(userData, token, newPassword);

    res.status(201).json({ userData, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).select(password);
    if (!user) {
      return res
        .status(401)
        .json('Пользователь с таким именем и паролем не найден');
    }

    const isPasswordValid = CryptoJS.AES.decrypt(
      user.password,
      NODE_ENV === 'production' ? PASSWORD_SECRET_KEY : SIMPLE_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (isPasswordValid !== password) {
      return res
        .status(401)
        .json('Пользователь с таким именем и паролем не найден');
    }

    user.password = undefined;

    const token = createToken(user._id);

    res.status(201).send({ user, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};
