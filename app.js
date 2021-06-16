const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");

const https = require("https");
const { response } = require("express");

const app =express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname +"/index.html");
});
app.get("/signup.html", function(req,res){
    res.sendFile(__dirname +"/signup.html");
});
app.get("/blog.html", function(req,res){
    res.sendFile(__dirname +"/blog.html");
});
app.get("/course.html", function(req,res){
    res.sendFile(__dirname +"/course.html");
});
app.get("/about.html", function(req,res){
    res.sendFile(__dirname +"/about.html");
});
app.get("/contact.html", function(req,res){
    res.sendFile(__dirname +"/contact.html");
});
app.get("/donate.html", function(req,res){
    res.sendFile(__dirname +"/donate.html");
});


app.post("/signup", function(req,res){
   
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data= {
         members:
          [{
              email_address : email,
              status : "subscribed",
              merge_fields :{
                  FNAME: firstName,
                  LNAME : lastName
           }
         }
      ]
    };

    const jsonData =JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/api_key";

    const options = {
      method : "POST",
      auth  : "abhishek:b35e31e17aef41be2316b18d07900fe2-us6"

    }
     
    const request=  https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
          response.on("data", function(data){
              console.log(JSON.parse(data));
          });
    });


    request.write(jsonData);
    request.end();


});


app.post("/failure" , function(req,res){
    res.redirect("/signup.html");
});






app.listen(process.env.PORT || 3000, function(){
    console.log("Server is up and running");
});

//b35e31e17aef41be2316b18d07900fe2-us6

//d7565b1665
