//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const { render } = require("ejs");
const date = require(__dirname + "/date.js");

// console.log(date());

const app = express();

const items = ["buy food" , "cook food", "eat food"];
const workItems = [];

// ----------------------------------------------------

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// ~~~~~~~~~~~~~~~~~~~~~~~~~ /  ~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get("/", function(req, res){

    // let day = date.getDate();
    let day = date.getDate();

    res.render('list', {listTittle:day , newListItems:items});
});

// 当请求被接收时，它会被捕获到该到app 中
app.post("/",function(req,res){
    console.log(req.body);  //输出 { input 的 name : 'work 页面输入的 new Item', button 的 name: 'button 的 value' }
    let item = req.body.newItem;

    // -------- if 检查 newitem 的 list 是否来自 work
    if (req.body.list === "work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
 
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~ /work ~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get("/work",function(req,res){
    // 将 /work 页面的 listTittle 命名为  "work List"
    res.render("list",{listTittle:"work List", newListItems:workItems});
});

app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~ /about ~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get("/about",function(req,res){
    res.render("about");
});




// ------------ at the end -----------------------------
app.listen(3000, function(){
  console.log("Server started on port 3000.");
});