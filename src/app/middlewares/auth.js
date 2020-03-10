const { authSecret } = require("../../config/config");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { errorHandler } = require("../../util/respHandler");

const authenticate = async req => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return false;
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer") {
    return false;
  }

  try {
    const decode = await promisify(jwt.verify)(token, authSecret);
    req.decode = decode;
    return true;
  } catch (err) {
    return false;
  }
};

const isAuthenticate = async (req, res, next) => {
  const isOk = await authenticate(req);
  if (isOk) {
    return next();
  }
  return res.status(401).send(errorHandler("Token Inválido."));
};

const isAuthenticatedAdmin = async (req, res, next) => {
  const isOk = await authenticate(req);
  if (isOk) {
    if (req.decode.type === 1) {
      return next();
    }
  }
  return res.status(401).send(errorHandler("Usuário Inválido."));
};

const isAuthenticatedClient = async (req, res, next) => {
  const isOk = await authenticate(req);
  if (isOk) {
    if (req.decode.type === 2) {
      return next();
    }
  }
  return res.status(401).send(errorHandler("Usuário Inválido."));
};

const isAuthenticatedPartner = async (req, res, next) => {
  const isOk = await authenticate(req);
  if (isOk) {
    if (req.decode.type === 3) {
      return next();
    }
  }
  return res.status(401).send(errorHandler("Usuário Inválido."));
};

module.exports = {
  isAuthenticated: isAuthenticate,
  isAuthenticatedAdmin: isAuthenticatedAdmin,
  isAuthenticatedClient: isAuthenticatedClient,
  isAuthenticatedPartner: isAuthenticatedPartner
};
