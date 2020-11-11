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

const users = [
  { name: "Adam", id: 0 },
  { name: "Bob", id: 1 },
  { name: "Charlie", id: 2 },
];

app.get("/users/:id", loginMiddleware, (req, res) => {
  const user = users.find((user) => user.id == req.params.id);
  if (!user) {
    res.status(404).send("No user found");
  } else {
    res.json(user);
  }
});

app.listen(PORT, () => {
  console.log("Server is up");
});
