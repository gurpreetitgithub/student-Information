const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('hbs');
const port = 5000

const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

//connection of mongodb

mongoose.connect("mongodb://127.0.0.1:27017/Students")
const db = mongoose.connection
db.once('open',()=>{
    console.log("mongodb connect successfully")
})

const Register = require("./model/resgisters");
const static_path = path.join(__dirname,"./public");
const templates_path = path.join(__dirname,"./templates/views");
const partials_path = path.join(__dirname,"./templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",templates_path)
hbs.registerPartials(partials_path);

app.get('/register',(req,res)=>{
     res.render('register');
})
    

app.get('/main',(req,res)=>{
    res.render('main')
})

app.post('/register',async(req,res)=>{
     const{name,Rno,Tmarks,perc} = req.body
       const user = new Register({
        name,
        Rno,
        Tmarks,
        perc
       })
       await user.save()
       console.log(user)
       res.send("Successful Registration")
})

//signup check

app.post('/main',async(req,res)=>{
    try{
        const  Rno = req.body.Rno;

        const userollno = await Register.findOne({Rno:Rno})
        res.send(userollno);
        console.log(userollno);
        //const userollno = await Register.findOne({rollno:Rno});
        //res.send(userrollno);
        //console.log(userrollno);

    } catch(error){
        res.status(400).send("invalid rollno");
    }
})
       


app.listen(port, ()  =>{
    console.log(`server started at:${port} `);
})