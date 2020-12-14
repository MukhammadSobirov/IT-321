const express                  = require("express"),
      app                      = express(),
      methodOverride           = require("method-override"),
      bodyParser               = require("body-parser");
let   mongoose                 = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("");

const Income    = require("./models/Income");

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    Income.find({}, (err, balance)=>{
        if(err){
            console.log(err)
        }else{
            res.render("main", {balance: balance});
            console.log(balance)
        }
    });
});

app.post("/income", (req, res)=>{
    Income.create(req.body.income, (err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/")
        }
    })
})

app.get("/income/edit/:id", (req, res)=>{
    Income.findById(req.params.id, req.body.income, (err, income)=>{
        if(err){
            console.log(err)
        }else{
            res.render("edit", {income: income})
        }
    })
})

app.put("/income/edit/:id", (req, res)=>{
    Income.findByIdAndUpdate(req.params.id, req.body.income, (err, income)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/")
        }
    })
})

app.delete("/income/:id", (req, res)=>{
    Income.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/")
        }
    });
});

let port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Server on");
});