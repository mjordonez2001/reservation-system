// http method not allowed handler
function methodNotAllowed(request, reponse, next) {
  next({
      status: 405,
      message: `${request.method} not allowed for ${request.originalUrl}`
  });
}

module.exports = methodNotAllowed;
