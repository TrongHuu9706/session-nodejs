/* Pre-requisites
 * Install "dependencies": {
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "nodemon": "^3.0.2"
  }
 */
const express   = require('express');
const PORT      = process.env.PORT || 5001;
const session   = require('express-session');

app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret            : 'Secretforyourproject',
    resave            : false,
    saveUninitialized : true,
    cookie            : { 
        secure  : false,
        httpOnly: true,
        maxAge  : 0.5 * 60 * 1000 // 30 sec
    }
}));

app.get("/get-session", function(req, res){
    if (!req.session.user){
        res.send("Time up");
    }else{
        res.send(req.session);
    }
    
});

app.get("/set-session", function(req, res){
    req.session.user = {
        username    : "UsernameTestA",
        age         : 20,
        email       : "EmailTesting@example.com"
    };
    res.send("Set session successfully!!");
});

app.listen(PORT, ()=>{
    console.log(`The Session's server is listening on PORT: ${PORT}`);
})
