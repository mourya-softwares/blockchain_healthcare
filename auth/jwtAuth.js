var jwt = require("jsonwebtoken");
const jwtKey = "7";
exports.assignJWT = function(req, res) {
  var user = {
    user1: "1234",
    user2: "1234"
  };
  const { username, password } = req.body;
  var token = jwt.sign({ username: username }, jwtKey, {
    algorithm: "HS256",
    expiresIn: 300
  });

  // set the cookie as the token string, with a similar max age as the token
  // here, the max age is in milliseconds, so we multiply by 1000
  res.cookie("token", token, { maxAge: 300 * 1000 });
};

exports.verifyJWT = function(req, res) {
  var token = req.cookies.token;
  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(401).end();
  }
  var payload;
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }
};
