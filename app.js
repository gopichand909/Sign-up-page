const express=require("express");
const request=require("request");
const bodyParser=require('body-parser');
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

   res.sendFile(__dirname + "Engineering buddy/index.html");
});
app.post("/",function(req,res){
  var first=req.body.fname;
  var last=req.body.lname;
  var email=req.body.mail;
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:first,
          LNAME:last
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);

   const url="https://us8.api.mailchimp.com/3.0/lists/4f7e1f61b5";
   const options={
     method:"POST",
     auth:"gopi:4513fc5b8041ff038105996f2140a7ea-us8"
   }

  const request= https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data))
    })
  })
request.write(jsonData);
request.end();

});

app.post("/failure",function(res,req){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("ready to go");
});


// api key:
// 4513fc5b8041ff038105996f2140a7ea-us8
// unique id
// 4f7e1f61b5
//https://us8.admin.mailchimp.com/lists/members/#p:1-s:25-sa:last_update_time-so:false
