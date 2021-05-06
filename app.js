const express=require('express');
const app=express();
const fs=require('fs');7
const path=require('path');
const hostname="127.0.0.1";
const port=80;
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser:true, useUnifiedTopology:true})


// Define Mongoose Schema 

const contactSchema=new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
})

const Contact= mongoose.model('Contact', contactSchema);


// const db=mongoose.connection;
// db.on('error', console.error.bind(console, 'connection-error'));
// db.once('open', ()=>{
//     console.log('We are connected bro')
// })


//Express Specific Stuff
// For serving static file
app.use('/static' , express.static('static'));
app.use(express.urlencoded())

//Pug Specific Stuff
// set the template engine  as pug 
app.set('view engine', 'pug')

// set the view directory
app.set('views',path.join(__dirname,'views'))

// End Points 

app.get('/',(req,res)=>{    
    // const params={ }
    res.status(200).render('home.pug')
})

app.get('/home',(req,res)=>{    
    // const params={ }
    res.status(200).render('home.pug')
})

app.get('/contact',(req,res)=>{    
    // const params={ }
    res.status(200).render('contact.pug')
})


app.post("/contact",(req,res)=>{
    // name=req.body.name
    // phone=req.body.phone
    // email=req.body.email
    // address=req.body.address
    // desc=req.body.desc

    // let output=(`Name ${name},Number :${phone},
    // Email:${email}, Address :${address}, Desc ;${desc}`)
    
    // fs.writeFileSync("salman.txt", output);

    // const params={message:"Your data submitted Successfully"};
    //  res.status(200).render("home.pug", params);

    var myData=new Contact(req.body);
    
    myData.save().then(()=>{
        res.send("This is item has been saved")
    }).catch(()=>{
        res.status(400).send('item has not been saved')
    })

})




app.listen(port,hostname ,()=>{
    console.log(`Server running at : http://${hostname}:${port}`);
})

