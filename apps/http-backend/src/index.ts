import express from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware/middleware";
import {CreateUserSchema,SigninSchema,CreateRoomSchema} from "@repo/common/types";

const app = express();
app.listen(3001);

app.post("/signup", (req, res) => {
  const data =CreateUserSchema.safeParse(req.body);
  
  if(!data.success){
    return res.json({message:"Invalid data"}); 
  }
  res.json({ userId: 123 });
});

app.post("/signin", (req, res) => {
   const data =SigninSchema.safeParse(req.body);
  
  if(!data.success){
    return res.json({message:"Invalid data"}); 
  }
  const userId=123;

  const token = jwt.sign(
    {
      userId
    },
    JWT_SECRET
  );
  res.json({ token });
});

app.post("/room",middleware, (req, res) => {

   const data =CreateRoomSchema.safeParse(req.body);
  
  if(!data.success){
    return res.json({message:"Invalid data"}); 
  }
  res.json({ roomId: 123 });
});
