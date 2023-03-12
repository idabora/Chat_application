const express = require('express');
const app=express();
const http=require('http').createServer(app);
const io=require('socket.io')(http);
const path=require('path');

// let templatepath=path.join(__dirname,"/view");
let staticpath=path.join(__dirname,"/public");


// app.set('view engine','hbs')
app.use(express.static(staticpath));


const PORT=process.env.PORT||'8000';
const hostname='127.0.0.1';

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
}
);

// app.get("/chatbox",(req,res)=>{
//     res.render("chatbox");
// })

io.on('connection',(socket)=>{
    // console.log("hello peoples..");
    socket.on('msg_event',(msg)=>{
        // console.log(msg);
        socket.broadcast.emit('msg_event',msg)
    })
})

console.log(__dirname);
http.listen(PORT,hostname,()=>{
    console.log(`server listening on port http://${hostname}:${PORT}`);
})