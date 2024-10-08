const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const user = require('../models/user');
const { NODE_ENV, SIMPLE_SECRET_KEY, TOKEN_SECRET_KEY } = process.env;

const tokenDecode = (req) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(' ')[1];

    try {
      const decoded = jsonwebtoken.verify(
        token,
        NODE_ENV === 'production' ? TOKEN_SECRET_KEY : SIMPLE_SECRET_KEY
      );
      return decoded;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

exports.verifyToken = async (req, res, next) => {
  const decoded = tokenDecode(req);

  if (decoded) {
    const userData = await user.findById(decoded.id);
    if (!user) {
      res.status(401).json('Необходима авторизация');
    }

    req.user = userData;
    next();
  } else {
    res.status(401).json('Необходима авторизация');
  }
};
