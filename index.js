var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbCons = require("./constants/db-constants");
var apiCons = require("./constants/api-constants");
var cors = require('cors');
var multer = require("multer");
var hindi = require("./langs/hindi.json");
var english = require("./langs/en.json");
var gujarati = require("./langs/guj.json");

var app = express();

app.use(cors());

const MongoClient = require('mongodb').MongoClient;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res,err){
res.send("welcome to express");


});



var db;
//mongodb://<dbuser>:<dbpassword>@ds133378.mlab.com:33378/kleveron
MongoClient.connect(dbCons.MONGO_URL, (err, database) => {
  if (err) return console.log(err)
  else{
    console.log("db done.....");
    db = database;

  }
 
})

app.post(apiCons.POST_LOGIN_API, function(req, res, err) {
  db.collection('logins').findOne({ username: req.body.username}, function(err, user) {
    console.log('User found ',req.body);
    // In case the user not found  
    if(err) {
      console.log('THIS IS ERROR RESPONSE');
      res.json(err);
    } 
    if (user!=null && (user.password === req.body.password)){
      console.log('User and password is correct');
      res.json({"data":"valid"});
    } else {
      console.log("Credentials wrong");
      res.json({"data":"invalid"});
    }              
});
})



// app.post('/api/login/', function(req, res) {
//   console.log('Req body in login ', req.body)
//   //console logs correctly as { username: bob, password: 123 }
//   db.collection('users').find(req.body).next(function(err, isMatch) {
//     console.log('ISMATCH IS: ' + isMatch)
//     if(err) {
//       console.log('THIS IS ERROR RESPONSE')
//       res.json(err)
//     } else {
//       console.log('THIS IS ISMATCH RESPONSE')
//       res.json(isMatch)
//     }
//   })
// })
app.post(apiCons.POST_ADMIN_INPUT_MASTER,function(req,res){
  console.log("innnnn");
  db.collection('adminInputMasterTemplates').save(req.body, (err, result) => {
    if (err) return console.log(err)
else    
    console.log('saved to database')
    
  })


});

app.get(apiCons.GET_INPUT_MASTER, function(req, res, err) {
  db.collection('adminInputMasterTemplates').find({ "user": "ravi"}).toArray( function(err, users) {
    console.log('User found ',req.body);
    // In case the user not found  
    if(err) {
      console.log('THIS IS ERROR RESPONSE');
      res.json(err);
    } 
    // if (user!=null && (user.password === req.body.password)){
    //   console.log('User and password is correct');
    //   res.json(user);
    // }
     else {
      console.log("Credentials wrong");
      res.send(users);
    }              
});
})

app.post("/save/admin-list-master",function(req,res){
  console.log("innnnn");
  db.collection('saveGridMaster').save(req.body, (err, result) => {
    if (err) return console.log(err)
else    
    console.log('saved to database')
    
  })


});


app.get("/get/admin-grid-master", function(req, res, err) {
  db.collection('saveGridMaster').find({ "user": "ravi"}).toArray( function(err, users) {
    console.log('User found ',req.body);
    // In case the user not found  
    if(err) {
      console.log('THIS IS ERROR RESPONSE');
      res.json(err);
    } 
    // if (user!=null && (user.password === req.body.password)){
    //   console.log('User and password is correct');
    //   res.json(user);
    // }
     else {
      console.log("Credentials wrong");
      res.send(users);
    }              
});
})



//POST_FORM_ADMIN_INPUT_MASTER
app.post(apiCons.POST_FORM_ADMIN_INPUT_MASTER,function(req,res){
  console.log("innnnn");
  db.collection('adminInputMaster_form_inputs').save(req.body, (err, result) => {
    if (err) return console.log(err)
else    
    console.log('saved to database')
    
  })


});

app.post("/save/admin2",function(req,res){
  console.log("innnnn");
  db.collection('admin2').save(req.body, (err, result) => {
    if (err) return console.log(err)
else    
    console.log('saved to database')
    
  })


});

app.post("/save/admin-input2",function(req,res){
  console.log("innnnn");
  db.collection('admin2inputs').save(req.body, (err, result) => {
    if (err) return console.log(err)
else    
    console.log('saved to database')
    
  })
});

  app.post("/save/admin-input2-names",function(req,res){
    console.log("innnnn");
    db.collection('admin2_names').save(req.body, (err, result) => {
      if (err) return console.log(err)
  else    
      console.log('saved to database')
      
    })

});

app.post("/save/widgets",function(req,res){
  console.log("innnnn");
  db.collection('widgets').save(req.body, (err, result) => {
    if (err) return console.log(err)
else    
    console.log('saved to database')
    
  })


});


// app.post("/savelist/adminInputMaster",function(req,res){
//   console.log("innnnn");
//   db.collection('adminInputMasterTemplate_list').save(req.body, (err, result) => {
//     if (err) return console.log(err)
// else    
//     console.log('saved to database')
    
//   })


// });


app.get("/getlist/admin-input-master",function(req,res){
  db.collection('adminInputMasterTemplate_list').find({ "user": "ravi"}).toArray( function(err, users) {
    console.log('User found ',req.body);
    // In case the user not found  
    if(err) {
      console.log('THIS IS ERROR RESPONSE');
      res.json(err);
    } 
   
     else {
      console.log("Credentials wrong");
      res.send(users);
    }
                  
});


});

app.get("/get/admin2",function(req,res){
  db.collection('admin2').find({ "User": "Aditya"}).toArray( function(err, users) {
    console.log('User found ',req.body);
    // In case the user not found  
    if(err) {
      console.log('THIS IS ERROR RESPONSE');
      res.json(err);
    } 
   
     else {
      console.log("Credentials wrong");
      res.send(users);
    }
                  
});


});

app.get("/get/admin2_names",function(req,res){
    db.collection('admin2_names').find({'User':'Aditya'}).toArray( function(err, users) {
      console.log('User found ',req.body);
      // In case the user not found  
      if(err) {
        console.log('THIS IS ERROR RESPONSE');
        res.json(err);
      } 
     
       else {
        console.log("Credentials wrong");
        res.send(users);
      }
                    
  });
  
  
  });

app.get("/get/widgets",function(req,res){
    db.collection('widgets').find({ "username": "ravi"}).toArray( function(err, users) {
      console.log('User found ',req.body);
      // In case the user not found  
      if(err) {
        console.log('THIS IS ERROR RESPONSE');
        res.json(err);
      } 
     
       else {
        console.log("Credentials wrong");
        res.send(users);
      }
                    
  });
  
  
  });

app.get("/get/initial/widgets",function(req,res){
    db.collection('widgetsInit').findOne({ "username": "ravi"},function(err, users) {
      console.log('User found ',req.body);
      // In case the user not found  
      if(err) {
        console.log('THIS IS ERROR RESPONSE');
        res.json(err);
      } 
     
       else {
        console.log("Credentials wrong");
        res.send(users);
      }
                    
  });
  
  
  });
  

// var DIR = './uploads/';

// var upload = multer({dest: DIR});



// app.use(multer({
//  dest: DIR,
//  rename: function (fieldname, filename) {
//    return filename + Date.now();
//  },
//  onFileUploadStart: function (file) {
//    console.log(file.originalname + ' is starting ...');
//  },
//  onFileUploadComplete: function (file) {
//    console.log(file.fieldname + ' uploaded to  ' + file.path);
//  }
// }));

// app.get('/upload1', function (req, res) {
//  res.end('file catcher example');
// });

// app.post('/upload2', function (req, res) {
//  upload(req, res, function (err) {
//    if (err) {
//      return res.end(err.toString());
//    }

//    res.end('File is uploaded');
//  });
// });

app.get('/lang/en.json', function (req, res,err) {
 
  res.json(english);
})
app.get('/lang/hindi.json',function(req,res,err){
  
  res.json(hindi);
  });

  app.get('/lang/guj.json',function(req,res,err){
  
    res.json(gujarati);
    });




   
    app.post("/download1",function(req,res,err){
      var Textboxes = req.body.controls;
      var htmlgen = `
     <!DOCTYPE html>
     <html>
     <head>
         <meta charset="utf-8" />
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <meta name="viewport" content="width=device-width, initial-scale=1">
         <meta name="description" content="">
         <meta name="author" content="">
         <title>Admin Input View</title>
         <link rel="shortcut icon" href="../images/fav.ico" type="image/x-icon" />
         <link href="../styles/bootstrap.min.css" rel="stylesheet" />
         <link href="../styles/font-awesome.min.css" rel="stylesheet" />
         <link href="../styles/perfect-scrollbar.css" rel="stylesheet" />
         <link href="../styles/style.css" rel="stylesheet" />
         <link href="../styles/responsive.css" rel="stylesheet" />
         <link href="../styles/animate.min.css" rel="stylesheet" />
     </head>
     <body>
         <div class="wrapper">
             <div class="aside left">
                 <div class="dash_logo">
                     <a href="#">
                         <img src="../images/settings/logo_dashboard.png" alt="kleveron" />
                     </a>
                 </div>
                 <div class="aside_nav">
                     <div class="sidebar-menu">
                         <ul class="menu">
                             <li>
                                 <h3>
                                     <label>
                                         Main
                                     </label>
                                 </h3>
                             </li>
                             <li class="active">
                                 <a href="admin-panel.html">
                                     <img src="../images/settings/Job-postings.png" class="icon-img" />
                                     <span>
                                         <label>
                                             Admin Panel
                                         </label>
                                     </span>
                                 </a>
     
                             </li>
                             <li>
                                 <a href="admin-input-master.html">
                                     <img src="../images/settings/Job-postings.png" class="icon-img" />
                                     <span>
                                         <label>
                                             Input Master
                                         </label>
                                     </span>
                                 </a>
     
                             </li>
                             <li>
                                 <a href="admin-grid-master.html">
                                     <img src="../images/settings/Job-postings.png" class="icon-img" />
                                     <span>
                                         <label>
                                             Grid Master
                                         </label>
                                     </span>
                                 </a>
                             </li>
                             <li>
                                 <a href="admin-list-master.html">
                                     <img src="../images/settings/Job-postings.png" class="icon-img" />
                                     <span>
                                         <label>
                                             List Master
                                         </label>
                                     </span>
                                 </a>
                             </li>
                             <li>
                                 <a href="admin-widget-master.html">
                                     <img src="../images/settings/Job-postings.png" class="icon-img" />
                                     <span>
                                         <label>
                                             Widget Master
                                         </label>
                                     </span>
                                 </a>
                             </li>
                         </ul>
                     </div>
                 </div>
             </div>
             <div class="content_wrap right">
                 <header class="frame_header">
                     <div class="row">
                         <div class="col-xs-4">
                             <div class="navbar-header">
                                 <i class="fa fa-bars"></i>
                             </div>
                         </div>
                         <div class="col-xs-4 text_center mob_head">
                             <h1>
                                 <label>
                                     Framework
                                 </label>
                             </h1>
                         </div>
                         <div class="col-sm-4">
                             <div class="header-rightside">
                                 <ul class="list-inline header-top pull-right navbar-right">
                                     <li class="dropdown">
                                         <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                             <img src="../images/settings/user.png" alt="" class="user-icon">
                                             <span>
                                                 <label>
                                                     John Smith
                                                 </label>
                                             </span> <b class="caret"></b>
                                         </a>
                                         <ul class="dropdown-menu animated fadeInUpShort">
                                             <li>
                                                 <a href="#" class="view btn-sm">
                                                     <label>
                                                         View Profile
                                                     </label>
                                                 </a>
                                             </li>
                                             <li>
                                                 <a href="#" class="view btn-sm">
                                                     <label>
                                                         Logout
                                                     </label>
                                                 </a>
                                             </li>
                                         </ul>
                                     </li>
                                     <li class="dropdown">
                                         <a href="#" class="icon-info dropdown-toggle" data-toggle="dropdown"
                                            role="button" aria-haspopup="true" aria-expanded="false">
                                             <i class="fa fa-language"
                                                aria-hidden="true"></i>
                                         </a>
                                         <ul class="dropdown-menu dropdown-menu-right animated fadeInUpShort">
                                             <li>
                                                 <a href="#" class="view btn-sm">
                                                     <label>
                                                         English
                                                     </label>
                                                 </a>
                                             </li>
                                             <li>
                                                 <a href="#" class="view btn-sm">
                                                     <label>
                                                         Gujarati
                                                     </label>
                                                 </a>
                                             </li>
                                         </ul>
                                     </li>
                                     <li class="dropdown">
                                         <a href="#" class="icon-info dropdown-toggle" data-toggle="dropdown"
                                            role="button" aria-haspopup="true" aria-expanded="false">
                                             <i class="fa fa-bell" aria-hidden="true">
                                             </i>
                                         </a>
                                         <ul class="dropdown-menu notify-drop animated fadeInUpShort">
                                             <div class="notify-drop-title">
                                                 <div class="row">
                                                     <div class="col-md-6 col-sm-6 col-xs-6">
                                                         <label>
                                                             Hiren (<b>2</b>)
                                                         </label>
                                                     </div>
                                                     <div class="col-md-6 col-sm-6 col-xs-6 text-right">
                                                         <a href=""><i class="fa fa-dot-circle-o"></i></a>
                                                     </div>
                                                     <div class="clearfix">
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="drop-content">
                                                 <li>
                                                     <div class="col-md-3 col-sm-3 col-xs-3">
                                                         <div class="notify-img">
                                                             <img src="../images/on-boarding/notification-img.png" alt="">
                                                         </div>
                                                     </div>
                                                     <div class="col-md-9 col-sm-9 col-xs-9 pd-l0">
                                                         <a href="">
                                                             <label>
                                                                 Ahmet
                                                             </label>
                                                         </a><p>
                                                             <label>
                                                                 Lorem ipsum sit dolor amet consilium. Saat önce
                                                             </label>
                                                         </p>
                                                     </div>
                                                     <div class="clearfix">
                                                     </div>
                                                 </li>
                                                 <li>
                                                     <div class="col-md-3 col-sm-3 col-xs-3">
                                                         <div class="notify-img">
                                                             <img src="../images/on-boarding/notification-img.png" alt="">
                                                         </div>
                                                     </div>
                                                     <div class="col-md-9 col-sm-9 col-xs-9 pd-l0">
                                                         <a href="">
                                                             <label>
                                                                 Ahmet
                                                             </label>
                                                         </a><p>
                                                             <label>
                                                                 Lorem ipsum sit dolor amet consilium. Saat önce
                                                             </label>
                                                         </p>
                                                     </div>
                                                     <div class="clearfix">
                                                     </div>
                                                 </li>
                                                 <li>
                                                     <div class="col-md-3 col-sm-3 col-xs-3">
                                                         <div class="notify-img">
                                                             <img src="../images/on-boarding/notification-img.png" alt="">
                                                         </div>
                                                     </div>
                                                     <div class="col-md-9 col-sm-9 col-xs-9 pd-l0">
                                                         <a href="">
                                                             <label>
                                                                 Ahmet
                                                             </label>
                                                         </a><p>
                                                             <label>
                                                                 Lorem ipsum sit dolor amet consilium. Saat önce
                                                             </label>
                                                         </p>
                                                     </div>
                                                     <div class="clearfix">
                                                     </div>
                                                 </li>
                                                 <li>
                                                     <div class="col-md-3 col-sm-3 col-xs-3">
                                                         <div class="notify-img">
                                                             <img src="../images/on-boarding/notification-img.png" alt="">
                                                         </div>
                                                     </div>
                                                     <div class="col-md-9 col-sm-9 col-xs-9 pd-l0">
                                                         <a href="">
                                                             <label>
                                                                 Ahmet
                                                             </label>
                                                         </a><p>
                                                             <label>
                                                                 Lorem ipsum sit dolor amet consilium. Saat önce
                                                             </label>
                                                         </p>
                                                     </div>
                                                     <div class="clearfix">
                                                     </div>
                                                 </li>
                                             </div>
                                             <div class="notify-drop-footer text-center">
                                                 <a href="">
                                                     <i class="fa fa-eye"></i>
                                                     <label>
                                                         View All
                                                     </label>
                                                 </a>
                                             </div>
                                         </ul>
                                     </li>
                                 </ul>
                             </div>
                         </div>
                     </div>
                 </header>
                 <div class="container-fluid bgwhite">
                     <!-- Modal -->
                    
                     <div class="row page_header">
                         <div class="col-xs-6">
                             <h2 class="head">
                                 <label>
                                     Input Forms
                                 </label>
                             </h2>
                         </div>
                         <div class="col-xs-6">
                             <img src="../images/on-boarding/onbrd-icon.png" class="icon-img pull-right" />
                         </div>
                     </div>
                     <div class="row page_content cmn_info_wrap">
                         <div class="framework1 container-fluid">
                             <div class="detail_wrapper">
                                 <div class="detail_nav_menu">
                                     <div class="company_details">
                                         <div class="row">`;
                   for(var i=0;i<Textboxes.length;i++){
                    switch(Textboxes[i].type){
case "textbox":
htmlgen +=` <div class="col-md-6 col-sm-6 col-xs-12 element_box klvrn_col"><input class="cmn_input" placeholder="${Textboxes[i].placeholder}" value="${Textboxes[i].values[0]}" id="${Textboxes[i].id}"></div>`;                         
break;                 

case "textarea":
htmlgen += `<div class="col-md-6 col-sm-6 col-xs-12 element_box klvrn_col"><textarea name="${Textboxes[i].id}" class="cmn_input" placeholder="${Textboxes[i].placeholder}" value="${Textboxes[i].values[0]}" id="${Textboxes[i].id}"></textarea></div>
`;
break;
case "select":
htmlgen += `
<div class="col-md-6 col-sm-6 col-xs-12 element_box dtl_row klvrn_col"><select name="${Textboxes[i].id}" class="cmn_input" id="${Textboxes[i].id}"><option value="${Textboxes[i].values[0]}" selected disabled>${Textboxes[i].values[0]}</option>`;
for(var k=1;k<Textboxes[i].values.length;k++){
htmlgen +=`
<option value="${Textboxes[i].values[k]}">${Textboxes[i].values[k]}</option>`;
}
htmlgen +=`</select></div>`;
break;
case "password":
htmlgen += `<div class="col-md-6 col-sm-6 col-xs-12 element_box klvrn_col"><div class="dtl_row"><div class="input-group"><input class="cmn_input password" id="${Textboxes[i].id}" placeholder="${Textboxes[i].placeholder}" type="password"><span class="input-group-addon custom_icn"><span class="fa fa-lock"></span></span></div></div></div>`;
break;

case "text_label":
htmlgen += `<div class="col-md-6 col-sm-6 col-xs-12 element_box klvrn_col"><label class="lbl_hdr">${Textboxes[i].lnames[0]}</label><div class="input-group">
<input id="${Textboxes[i].id}" value="${Textboxes[i].values[0]}" class="cmn_input" placeholder="${Textboxes[i].placeholder}" type="text"><span class="input-group-addon custom_icn"><span class="fa fa-address-card">
</span>
</span>
</div>
</div>`;
break;
case "datepicker":
htmlgen += `<div class="col-md-6 col-sm-6 col-xs-12 klvrn_dt_picker"><label class="lbl_hdr">Select Date: </label><div id="datetimepicker1" class="input-group date"><input type="text" class="cmn_input" value="05/01/2017"><span class="input-group-addon"><span class="fa fa-calendar"></span></span></div></div>`;
break;

case "timepicker":
htmlgen += `<div class="col-md-6 col-sm-6 col-xs-12 klvrn_dt_picker"><label class="lbl_hdr">Select Time: </label><div class='input-group date' id='datetimepicker2'><input type='text' class="cmn_input"/><span class="input-group-addon"><span class="fa fa-clock-o"></span></span></div></div>`;
break;

case "checkbox":
htmlgen += `<div class="col-md-6 col-sm-6 col-xs-12 custom_chk_bx"><div class="chk_bx chk_top"><input type="checkbox" id="chkid1" name="" value=""><label for="chkid1">check box1</label></div></div>`;
break;
case "twitter":
htmlgen += `<div class="col-md-6 col-sm-6 col-xs-12 element_box"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2 social_col"><div class="social_icon twitter"><i class="fa fa-twitter" aria-hidden="true"></i></div></div><div class="col-md-10 col-sm-10 col-xs-10 social_input"><input id="${Textboxes[i].id}" value="${Textboxes[i].values[0]}" class="cmn_input" placeholder="${Textboxes[i].placeholder}"></div></div></div>`;
break;
case "twitter":
htmlgen += `<div class="col-md-6 col-sm-6 col-xs-12 element_box"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2 social_col"><div class="social_icon twitter"><i class="fa fa-twitter" aria-hidden="true"></i></div></div><div class="col-md-10 col-sm-10 col-xs-10 social_input"><input id="${Textboxes[i].id}" value="${Textboxes[i].values[0]}" class="cmn_input" placeholder="${Textboxes[i].placeholder}"></div></div></div>`;
break;
case "fbook":
htmlgen +=`<div class="col-md-6 col-sm-6 col-xs-12 element_box"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2 social_col"><div class="social_icon fb"><i class="fa fa-facebook" aria-hidden="true"></i></div></div><div class="col-md-10 col-sm-10 col-xs-10 social_input"><input class="cmn_input" id="${Textboxes[i].id}" value="${Textboxes[i].values[0]}" placeholder="${Textboxes[i].placeholder}"></div>
</div>
</div>
`;
break;
                    }                                      
                      

                   }                      
   
  htmlgen += `</div></div></div></div></div></div>
 
  </div><div class="clearfix"></div></div><div class="clearfix"></div></div>
         <!-- ------------------- JS ------------------------- -->
         <script type="text/javascript" src="../js/jquery-1.11.3.min.js"></script>
         <script type="text/javascript" src="../js/bootstrap.min.js"></script>
         <!--- ui-tabs - -->
         <script type="text/javascript" src="../js/jquery-ui.js"></script>
         <script src="../js/perfect-scrollbar.jquery.js"></script>
         <script src="../js/perfect-scrollbar.js"></script>
         <script src="../js/moment-with-locales.min.js"></script>
         <script src="../js/bootstrap-datetimepicker.min.js"></script>
     
         <script type="text/javascript">
             $('.navbar-header').click(function () {
                 $('.wrapper').toggleClass('hidemenu');
             });
     
             if ($(window).width() < 767) {
                 $(document).click(function (e) {
                     if (!$(e.target).closest('.navbar-header, .aside').length) {
                         $('.wrapper').removeClass('hidemenu');
                     }
                 })
             }
             $('#datetimepicker1').datetimepicker({
                icons: {
                    time: 'fa fa-clock-o',
                    date: 'fa fa-calendar',
                    up: 'fa fa-chevron-up',
                    down: 'fa fa-chevron-down',
                    previous: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right',
                    today: 'fa fa-crosshairs',
                    clear: 'fa fa-trash'
                },
                format: 'MM/DD/YYYY'
            });
            $(function () {
                $('#datetimepicker2').datetimepicker({
                    format: 'LT'
                });
            });


     
             $('.aside_nav').perfectScrollbar();
             $('.drop-content').perfectScrollbar();
     
             $("#detail_tabs").tabs();
             $(".tab_no").click(function () {
                 var active = $("#detail_tabs").tabs("option", "active");
                 $("#detail_tabs").tabs("option", "active", active + 1);
     
             });
     
             //$(window).load(function () {
             //    var H = $(window).height();
             //    var nH = $('.logo_bar').height();
             //    var nD = $('.onboarding_lbl').height();
             //    var F = $('footer').height();
             //    var C = H - nH - nD - F - 10;
             //    $('.detail_wrapper').css('min-height', C);
             //    $(window).resize(function () {
             //        var H = $(window).height();
             //        var nH = $('.logo_bar').height();
             //        var nD = $('.onboarding_lbl').height();
             //        var F = $('footer').height();
             //        var C = H - nH - nD - F - 10;
             //        $('.detail_wrapper').css('min-height', C);
             //    });
             //});
     
             $(window).load(function () {
                 var H = $(window).height();
                 var nH = $('.frame_header').height();
                 var nD = $('.dash_logo').height();
                 //var F = $('footer').height();
                 var S = H - nH;
                 //var C = H - nH - F - 60;
                 $('.wrapper ').css('min-height', H);
                 $('.aside_nav ').css('height', S);
                 //$('.bgwhite').css('min-height', C);
                 if ($(window).width() < 767) {
                     $('.aside_nav ').css('min-height', S - nD - 20);
                 }
                 $(window).resize(function () {
                     var H = $(window).height();
                     var nH = $('.frame_header').height();
                     var nD = $('.dash_logo').height();
                     //var F = $('footer').height();
                     var S = H - nH;
                     //var C = H - nH - F - 60;
                     $('.wrapper ').css('min-height', H);
                     $('.aside_nav ').css('height', S);
                     //$('.bgwhite').css('min-height', C);
                     if ($(window).width() < 767) {
                         $('.aside_nav ').css('min-height', S - nD - 20);
                     }
                 });
             });
     
     
     
             $(".nx_btn").click(function () {
                 var nextDiv = $(".modal_tabs:visible").next(".modal_tabs");
                 if (nextDiv.length == 0) { // wrap around to beginning
                     nextDiv = $(".modal_tabs:first");
                 }
                 $(".modal_tabs").hide();
                 nextDiv.show();
             });
     
             $('#vldtn_btn').on('change', function (e) {
                 if (e.target.checked) {
                     $('.hide_lbl').show();
                 }
                 else {
                     $('.hide_lbl').hide();
                 }
             });
     
             $('#lbl_tgl').on('change', function (e) {
                 if (e.target.checked) {
                     $('.hide_lbl_cntrl').show();
                     $('.hide_nxt').show();
                     $('.hide_skip').hide();
                 }
                 else {
                     $('.hide_lbl_cntrl').hide();
                     $('.hide_skip').show();
                     $('.hide_nxt').hide();
                 }
             });
     
         </script>
     </body>
     </html>`;
      


    //   var fs = require('fs');
    //   var archiver = require('archiver');
       
    //   // create a file to stream archive data to.
    //   var output = fs.createWriteStream('./zip-output/example.zip');
    //   var archive = archiver('zip', {
    //     zlib: { level: 9 } // Sets the compression level.
    //   });
       
    //   // listen for all archive data to be written
    //   // 'close' event is fired only when a file descriptor is involved
    //   output.on('close', function() {
    //     console.log(archive.pointer() + ' total bytes');
    //     console.log('archiver has been finalized and the output file descriptor has closed.');
    //   });
       
    //   // This event is fired when the data source is drained no matter what was the data source.
    //   // It is not part of this library but rather from the NodeJS Stream API.
    //   // @see: https://nodejs.org/api/stream.html#stream_event_end
    //   output.on('end', function() {
    //     console.log('Data has been drained');
    //   });
       
    //   // good practice to catch warnings (ie stat failures and other non-blocking errors)
    //   archive.on('warning', function(err) {
    //     if (err.code === 'ENOENT') {
    //       // log warning
    //     } else {
    //       // throw error
    //       throw err;
    //     }
    //   });
       
    //   // good practice to catch this error explicitly
    //   archive.on('error', function(err) {
    //     throw err;
    //   });
       
    //   // pipe archive data to the file
    //   archive.pipe(output);
       
    //   // append a file from stream
    
    //    var dir1 = "./appfolder";
    //   // append files from a sub-directory and naming it `new-subdir` within the archive
    //   archive.directory(dir1+'/app-gen', 'app-gen');
    //   archive.append(htmlgen,dir1+'/app-gen/admin/admin-input.html');
    //   // archive.directory(dir1+'/fonts', 'fonts');
    //   // archive.directory(dir1+'/images', 'images');
    //   // archive.directory(dir1+'/js', 'js');
    //   // archive.directory(dir1+'/styles', 'styles');
    //   // append files from a sub-directory, putting its contents at the root of archive
      
    //   // finalize the archive (ie we are done appending files but streams have to finish yet)
    //   // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    //   archive.finalize();
     
    //   setTimeout((function() {res.download("./zip-output/example.zip")}), 2000);  

res.send(htmlgen); 

  
    });





app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  

  

  



app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
