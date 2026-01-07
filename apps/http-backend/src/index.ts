import express from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware/middleware";

const app = express();
app.listen(3001);

app.post("/signup", (req, res) => {
  res.json({ userId: 123 });
});

app.post("/signin", (req, res) => {
  const userId = 1;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.json({ token });
});

app.post("/room",middleware, (req, res) => {
  res.json({ roomId: 123 });
});
