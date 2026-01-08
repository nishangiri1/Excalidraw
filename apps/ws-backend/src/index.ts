import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection",function connection(ws,req) {

    const url=req.url;
    if(!url){
        return;
    }
    const qureyParam= new URLSearchParams(url.split('?')[1]);
    const token=qureyParam.get('token')||"";
    if(!token){
        return;
    }
    const decoded =jwt.verify(token,JWT_SECRET);

    if(typeof decoded=="string"){
        ws.close();
        return;
    }
   
    if(!decoded || !decoded.userId){
        ws.close();
        return;
    }
    console.log(`New connection on ${url}`);
    ws.on("message", function message(data) {
        ws.send(`Hello, you sent -> ${data}`);  
        
    });
});