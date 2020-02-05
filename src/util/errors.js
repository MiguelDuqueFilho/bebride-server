// 'defaultSuccess',
//     payload => !payload.msg ? 'Operação realidada com sucesso!' : payload.msg,
//     { type: 'success', icon: 'check' }

// 'defaultError',
//     payload => !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg,
//     { type : 'error', icon : 'times' }

//
"use strict";

class ExtendableError extends Error {
  constructor(message) {
    if (new.target === ExtendableError)
      throw new TypeError(
        'Abstract class "ExtendableError" cannot be instantiated directly.'
      );
    if (arguments.length === 0) super("internal server error");
    else super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.contructor);
  }
}

class DatabaseError extends ExtendableError {
  constructor(message) {
    super(message);
    this.message = {
      type: message.name,
      title: message.errors[0].type,
      status: message.original.errno,
      detail: message.errors[0].message,
      instance: "/login/log/abc123"
    };
    this.message["development"] = {
      message: message.errors[0].message,
      code: message.original.errno,
      type: message.errors[0].type
    };
    message = this.message;
  }
}

class CheckError {
  constructor(message) {
    if (message.name.substring(0, 9) === "Sequelize") {
      new DatabaseError(message);
    } else {
      new BadRequest(message);
    }
    // err["errormodel"] = {
    //   enduser: {
    //     name: this.constructor.name,
    //     code: err.original.errno,
    //     type: err.errors[0].type,
    //     message: err.errors[0].message
    //   },
    //   development: {
    //     name: this.constructor.name,
    //     errname: err.name,
    //     type: err.errors[0].type,
    //     message: err.errors[0].message,
    //     errno: err.original.errno,
    //     sqlState: err.original.sqlState,
    //     sqlMessage: err.original.sqlMessage
    //   }

    Error.captureStackTrace(this, this.contructor);
    // err.push(this.errormodel);
  }

  // this.message = message;
  // Error.captureStackTrace(this, this.contructor);
}

// 400 Bad Request
class BadRequest extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("bad request");
    else super(m);
  }
}

// 401 Unauthorized
class Unauthorized extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("unauthorized");
    else super(m);
  }
}

// 403 Forbidden
class Forbidden extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("forbidden");
    else super(m);
  }
}

// 404 Not Found
class NotFound extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("not found");
    else super(m);
  }
}

// 409 Conflict
class Conflict extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("conflict");
    else super(m);
  }
}

// 422 Unprocessable Entity
class UnprocessableEntity extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("unprocessable entity");
    else super(m);
  }
}

// 500 Internal Server Error
class InternalServerError extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("internal server error");
    else super(m);
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.message = message;
  }
}
class PermissionError extends Error {
  constructor(message) {
    super(message);
    this.name = "PermissionError";
    this.message = message;
  }
}

module.exports.CheckError = CheckError;
module.exports.BadRequest = BadRequest;
module.exports.Unauthorized = Unauthorized;
module.exports.Forbidden = Forbidden;
module.exports.NotFound = NotFound;
module.exports.Conflict = Conflict;
module.exports.UnprocessableEntity = UnprocessableEntity;
module.exports.InternalServerError = InternalServerError;
