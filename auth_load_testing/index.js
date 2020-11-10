const express = require("express");
const app = express();
const PORT = 3000;

app.get("/login", (req, res) => {
  res.json({
    token: "secret-token",
  });
});

const loginMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token !== "secret-token") {
    res.status(403).send("Not logged in");
  } else {
    next();
  }
};

app.get("/secret", loginMiddleware, (req, res) => {
  res.send("Welcome to the secret page");
});

app.listen(PORT, () => {
  console.log("Server is up");
});
