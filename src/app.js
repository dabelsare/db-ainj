const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');
const router = express.Router();
var Cart = require('../src/models/cart');


const session = require('express-session');
var flash = require('express-flash');
app.use(flash());
// var MySQLStore = require('express-mysql-session')(session);

// var options = {
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '',
//     database: 'ainj',
//     schema: {
//         tableName: 'products',
//         columnNames: {
//             session_id: 'product_session_id',
//             expires: 'id',
//             data: 'pname'
//         }
//     }
// };
// var sessionStore = new MySQLStore(options);
 
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    // store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge:180*60*1000}
}));

// app.use(session({
//     secret: '2C44-4D44-WppQ38S',
//     resave: true,
//     saveUninitialized: true
// }));

 const storage = multer.diskStorage({
    destination: 'src/uploads/',
    limits: {
      fileSize: 200*1024*1024
    },
    filename: function (req, file, cb) {        
        // null as first argument means no error
        cb(null, file.originalname )
    }
})

  const upload = multer({
    storage: storage,
    // fileFilter: function (req, file, cb) {
    //     sanitizeFile(file, cb);
    // }
}).single('filename')

 //  var mysql = require('mysql');
	// var con = mysql.createConnection({
	//   host: "localhost",
	//   user: "root",
	//   password: "AINJ@123",
	//   database: "ainj"
	// });

	// con.connect(function(err) {
	//   if (err) throw err;
	//   console.log("Database Connected!");
	// })

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/view/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/welcome',function(req,res){
  res.sendFile(path.join(__dirname+'/view/index1.html'));
});



router.get('/admin',function(req,res){
  res.sendFile(path.join(__dirname+'/view/admin/index.html'));
});

// router.get('/welcome_Admin',function(req,res){
//   res.sendFile(path.join(__dirname+'/view/admin/index1.html'));
// });

router.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});
//add the router
app.set('views', [path.join(__dirname+'/view'), path.join(__dirname+'/view/admin')]);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/view'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/script'));
//Store all JS and CSS in Scripts folder.

app.use(express.static(__dirname + '/uploads'));

router.post('/reseller-hosting', [
], (req, res) => {
  var sql = "INSERT INTO reseller_hosting (ptype, charges, storage, emails, domains,bandwidth) VALUES ('"+req.body.ptype+"','"+req.body.charges+"','"+req.body.storage+"','"+req.body.emails+"','"+req.body.domains+"','"+req.body.bandwidth+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-admin-reseller')
})


//product data save
router.post('/add-products', [
], (req, res) => {
  // console.log(req.body.filename);

  upload(req, res, (err) => {
        if (err){
          console.log(err); 
            //res.render('admin/showprod', { msg: err})
        }else{
            // If file is not selected
            if (req.file == undefined) {
                // res.render('index', { msg: 'No file selected!' })
              console.log("No File selected");
            }
            else{
                // res.render('index', { msg: 'File uploaded successfully!' })
                  var sql = "INSERT INTO products (pname, pprice, file) VALUES ('"+req.body.pname+"','"+req.body.pprice+"','"+req.file.filename+"')";
                  con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                  });
                console.log("File uploaded successfully");
            }
        }
        
      // req.flash('success', 'Record inserted successfully');
    })
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-onlineprod')
})


//contact data save customer
router.post('/add-contact', [
], (req, res) => {
 
  var sql = "INSERT INTO contact (name, email, mobile, query) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.mobile+"','"+req.body.query+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('contact.html')

})

//Bidding rate from customer data save
router.post('/add-bidrate', [
], (req, res) => {
 
  var sql = "INSERT INTO bidding (workid, bidname, empname, emailid, contact, bidrate) VALUES ('"+req.body.workid+"','"+req.body.bidname+"','"+req.body.empname+"','"+req.body.emailid+"','"+req.body.contact+"','"+req.body.bidrate+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('bidding.html')

})

// data save admin freelance
router.post('/proj-freelance', [
], (req, res) => {
  upload(req, res, (err) => {
        if (err){
          console.log(err); 
            //res.render('admin/showprod', { msg: err})
        }else{
            // If file is not selected
            if (req.file == undefined) {
                // res.render('index', { msg: 'No file selected!' })
              console.log("No File selected");
            }
            else{
 
              var sql = "INSERT INTO freelance (prname, prdetails, prfile) VALUES ('"+req.body.prname+"','"+req.body.prdetails+"','"+req.file.filename+"')";
              con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
              });
              console.log("File uploaded successfully");
            }
        }
    
    })

  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-admin-freelance')
})

// data save admin online course
router.post('/online-course', [
], (req, res) => {
  upload(req, res, (err) => {
        if (err){
          console.log(err); 
            //res.render('admin/showprod', { msg: err})
        }else{
            // If file is not selected
            if (req.file == undefined) {
                // res.render('index', { msg: 'No file selected!' })
              console.log("No File selected");
            }
            else{
 
  var sql = "INSERT INTO online_course (cname, cduration, cfees, cfile) VALUES ('"+req.body.cname+"','"+req.body.cduration+"','"+req.body.cfees+"','"+req.file.filename+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  console.log("File uploaded successfully");
            }
        }
    
    })
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-admin-course')
})

// data save admin college project
router.post('/college-project', [
], (req, res) => {
  upload(req, res, (err) => {
        if (err){
          console.log(err); 
            //res.render('admin/showprod', { msg: err})
        }else{
            // If file is not selected
            if (req.file == undefined) {
                // res.render('index', { msg: 'No file selected!' })
              console.log("No File selected");
            }
            else{
 
  var sql = "INSERT INTO college_project (pname, pprice, pfile) VALUES ('"+req.body.pname+"','"+req.body.pprice+"','"+req.file.filename+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  console.log("File uploaded successfully");
            }
        }
    
    })
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-admin-colpro')
})

// data save admin consultancy job openings
router.post('/job-openings', [
], (req, res) => {

  var sql = "INSERT INTO job_openings (cmname, skills, jd, jlocation, jsalary, jexp, jeleg) VALUES ('"+req.body.cmname+"','"+req.body.skills+"','"+req.body.jd+"','"+req.body.jlocation+"','"+req.body.jsalary+"','"+req.body.jexp+"','"+req.body.jeleg+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-admin-jobs')
})

// data save admin resume templates
router.post('/resume-temp', [
], (req, res) => {
  upload(req, res, (err) => {
        if (err){
          console.log(err); 
            //res.render('admin/showprod', { msg: err})
        }else{
            // If file is not selected
            if (req.file == undefined) {
                // res.render('index', { msg: 'No file selected!' })
              console.log("No File selected");
            }
            else{

  var sql = "INSERT INTO resume (type, rfile) VALUES ('"+req.body.type+"','"+req.file.filename+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  console.log("File uploaded successfully");
            }
        }
    
    })
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-admin-resume')
})

// data save admin blog posts
router.post('/blog-posting', [
], (req, res) => {
  upload(req, res, (err) => {
        if (err){
          console.log(err); 
            //res.render('admin/showprod', { msg: err})
        }else{
            // If file is not selected
            if (req.file == undefined) {
                // res.render('index', { msg: 'No file selected!' })
              console.log("No File selected");
            }
            else{
                var sql = "INSERT INTO blog (bname, auth, bd, bfile) VALUES ('"+req.body.bname+"','"+req.body.auth+"','"+req.body.bd+"','"+req.file.filename+"')";
                con.query(sql, function (err, result) {
                  if (err) throw err;
                  console.log("1 record inserted");
                });
                // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
                res.redirect('/show-blogs')
            }
      }
    })

})

// data save admin dm offer post
router.post('/offer-posting', [
], (req, res) => {
   upload(req, res, (err) => {
        if (err){
          console.log(err); 
            //res.render('admin/showprod', { msg: err})
        }else{
            // If file is not selected
            if (req.file == undefined) {
                // res.render('index', { msg: 'No file selected!' })
              console.log("No File selected");
            }
            else{

  var sql = "INSERT INTO dmoffer (dtitle, ddesc, dfile) VALUES ('"+req.body.dtitle+"','"+req.body.ddesc+"','"+req.file.filename+"')";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  console.log("File uploaded successfully");
            }
        }
        
      // req.flash('success', 'Record inserted successfully');
    })
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-dm-offer')
})

// data save customer side freelancing
router.post('/customer-freelance', [
], (req, res) => {
  var sql = "INSERT INTO customer_freelance (companyname, cprname, cprdetails, cprfile) VALUES ('"+req.body.companyname+"','"+req.body.cprname+"','"+req.body.cprdetails+"','"+req.body.cprfile+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/freelancing.html')
})

// data save front end side infotech intern student registration
router.post('/student-reg', [
], (req, res) => {
   upload(req, res, (err) => {
        if (err){
          console.log(err); 
            //res.render('admin/showprod', { msg: err})
        }else{
            // If file is not selected
            if (req.file == undefined) {
                // res.render('index', { msg: 'No file selected!' })
              console.log("No File selected");
            }
            else{
  var sql1 = "INSERT INTO login (uname, pass, type) VALUES ('"+req.body.uname+"','"+req.body.pass+"','infotech')";
  con.query(sql1, function (err, result) {
    if (err) throw err;

	   var sql = "INSERT INTO student_registration (sname, smob, gen, dob, email, addr, edu, skills, resume, uname, pass) VALUES ('"+req.body.sname+"','"+req.body.smob+"','"+req.body.gen+"','"+req.body.dob+"','"+req.body.email+"','"+req.body.addr+"','"+req.body.edu+"','"+req.body.skills+"','"+req.file.filename+"','"+req.body.uname+"','"+req.body.pass+"')";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  });
  console.log("File uploaded successfully");
            }
        }
    
    })
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/signup.html')
})

// data save front end side company freelance registration
router.post('/freelancecomp-reg', [
], (req, res) => {
  var sql1 = "INSERT INTO login (uname, pass, type) VALUES ('"+req.body.uname+"','"+req.body.pass+"','freelance')";
  con.query(sql1, function (err, result) {
    if (err) throw err;

     var sql = "INSERT INTO freelancecomp_reg (hrname,fcname, fcaddr, fcemail, fcmob, uname, pass) VALUES ('"+req.body.hrname+"','"+req.body.fcname+"','"+req.body.fcaddr+"','"+req.body.fcemail+"','"+req.body.fcmob+"','"+req.body.uname+"','"+req.body.pass+"')";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  });
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/signup.html')
})

// data save customer side consultancy student registration
router.post('/constudent-reg', [
], (req, res) => {
   upload(req, res, (err) => {
        if (err){
          console.log(err); 
            //res.render('admin/showprod', { msg: err})
        }else{
            // If file is not selected
            if (req.file == undefined) {
                // res.render('index', { msg: 'No file selected!' })
              console.log("No File selected");
            }
            else{

var sql1 = "INSERT INTO login (uname, pass, type) VALUES ('"+req.body.uname+"','"+req.body.pass+"','consultancy')";
  con.query(sql1, function (err, result) {
    if (err) throw err;

   var sql = "INSERT INTO online_placement (sname, mob, sex, dob, email, addr, salary, exp, edu, skills, resume, uname, pass) VALUES ('"+req.body.sname+"','"+req.body.mob+"','"+req.body.sex+"','"+req.body.dob+"','"+req.body.email+"','"+req.body.addr+"','"+req.body.salary+"','"+req.body.exp+"','"+req.body.edu+"','"+req.body.skills+"','"+req.file.filename+"','"+req.body.uname+"','"+req.body.pass+"')";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  });
  console.log("File uploaded successfully");
            }
        }
    
    })
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/signup.html')
})

// data save front portal online sale customer registration
router.post('/onlinecust-reg', [
], (req, res) => {

 var sql1 = "INSERT INTO login (uname, pass, type) VALUES ('"+req.body.uname+"','"+req.body.pass+"','it')";
  con.query(sql1, function (err, result) {
    if (err) throw err;

   var sql = "INSERT INTO online_cust_reg (cname, mob, gender, dob, email, addr, state, city, uname, pass) VALUES ('"+req.body.cname+"','"+req.body.mob+"','"+req.body.gender+"','"+req.body.dob+"','"+req.body.email+"','"+req.body.addr+"','"+req.body.state+"','"+req.body.city+"','"+req.body.uname+"','"+req.body.pass+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/signup.html')
})

// data save dm customer registration
router.post('/dmcust-reg', [
], (req, res) => {
   
var sql1 = "INSERT INTO login (uname, pass, type) VALUES ('"+req.body.uname+"','"+req.body.pass+"','dm')";
  con.query(sql1, function (err, result) {
    if (err) throw err;
      var sql = "INSERT INTO dm_reg (dname, dmob, dsex, dob, demail, uname, pass) VALUES ('"+req.body.dname+"','"+req.body.dmob+"','"+req.body.dsex+"','"+req.body.dob+"','"+req.body.demail+"','"+req.body.uname+"','"+req.body.pass+"')";     
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
  });
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/signup.html')
})

// data save main page form
router.post('/get-started', [
], (req, res) => {
  var sql = "INSERT INTO customer (fnm, ph, eadd) VALUES ('"+req.body.fnm+"','"+req.body.ph+"','"+req.body.eadd+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/welcome')
})

// get data of jobs at front end
router.get('/show-job', [
], (req, res) => {
   var sql = "select * from job_openings";
  con.query(sql, function (err, result) {
    if (err) throw err;
    if (req.session) {

    }else{
        req.session.user = "Guest";
    }
    res.render('jobs.ejs', {
                jobs: result,
                session:req.session
            });
    // console.log(result[0]);
  });
})


// get data of online store to front end
router.get('/show-prod', [
], (req, res) => {
  var sql = "select * from products";
  con.query(sql, function (err, result) {
    if (err) throw err;
    if (req.session) {

    }else{
        req.session.user = "Guest";
    }
    res.render('onlinesale.ejs', {
                showprod: result,layout:false,
                session: req.session
            });
  });
})

// to show dmpage to front end
router.get('/dmpage', [
], (req, res) => {
  var sql = "select * from dmoffer";
  con.query(sql, function (err, result) {
    if (err) throw err;
    if (req.session) {

    }else{
        req.session.user = "Guest";
    }
    res.render('dmpage.ejs', {
         showdmoffer: result,layout:false,
        session: req.session
      });
    });
})

// get data of freelance job to front end
router.get('/show-freelance-job', [
], (req, res) => {
   var sql = "select * from customer_freelance";
  con.query(sql, function (err, result) {
    if (err) throw err;
    if (req.session) {

    }else{
        req.session.user = "Guest";
    }
    res.render('customer-freelance-jobs.ejs', {
                freelancejob: result,
                session:req.session
            });
    // console.log(result[0]);
  });
})

// get data of admin JAS freelance job to front end
router.get('/show-freelance-job-admin', [
], (req, res) => {
   var sql = "select * from freelance";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('admin-freelance-jobs.ejs', {
                // title: All Jobs
                freelancejobadmin: result
            });
    // console.log(result[0]);
  });
})

// get data of admin inotech courses to front end
router.get('/show-course', [
], (req, res) => {
  var search = req.query.search;
  // console.log(search);
  if (search) {
   var sql = "select * from online_course where cname LIKE '%"+search+"%'";
  }else{
    var sql = "select * from online_course";
  }
  con.query(sql, function (err, result) {
    if (err) throw err;
    if (req.session.user) {

    }else{
        req.session.user = "Guest";
    }
    res.render('onlinecourse.ejs', {
                courses: result,
                session:req.session
            });
  });
})

router.post('/show-course-search/', [
], (req, res) => {
  var search = req.body.search;
   var sql = "select * from online_course where cname LIKE '%"+search+"%'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    if (req.session.user) {

    }else{
        req.session.user = "Guest";
    }
    res.render('onlinecourse.ejs', {
                courses: result,
                session:req.session
            });
  });
})


router.get('/add-to-cart-course/:id', function(req, res, next) {
  var courseId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  var sql = "select * from online_course";
  con.query(sql, function (err, result) {
    if (err) throw err;
    var courses= result;
    var course = courses.filter(function(item) {
        return item.id == courseId;
      });
    cart.add(course[0], courseId);
    req.session.cart = cart;
    // console.log(req.session.cart);
    res.redirect('/show-course');
    // inline();
  });

});

router.get('/cart-course', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('cart', {
      courses: null
    });
  }
  var cart = new Cart(req.session.cart);
  if (req.session.user) {

    }else{
        req.session.user = "Guest";
    }
    console.log(cart.getItems());
  res.render('cart-courses.ejs', {
    title: 'AINJ Shopping Cart',
    courses: cart.getItems(),
    totalPrice: cart.totalPrice,
    session:req.session
  });

});

router.get('/remove-course/:id', function(req, res, next) {
  var courseId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(courseId);
  req.session.cart = cart;
  res.redirect('/cart-course');
});

// get data of admin College project to front end
router.get('/show-colpro', [
], (req, res) => {
   var sql = "select * from college_project";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('onlinecollegeproject.ejs', {
                // title: All Jobs
                colpro: result
            });
    // console.log(result[0]);
  });
})


// get data of admin resume template to front end
router.get('/show-resumes-cust', [
], (req, res) => {
   var sql = "select * from resume";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('services.ejs', {
                // title: All Jobs
                resume: result
            });
    // console.log(result[0]);
  });
})



// get data of inserted admin products on same admin page
router.get('/show-onlineprod', [
], (req, res) => {
   var sql = "select * from products";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('onlinesaleadmin.ejs', {
                // title: All Jobs
                onlinepro: result
            });
    // console.log(result[0]);
  });
})

// get data of inserted blogs on same admin page
router.get('/show-blogs', [
], (req, res) => {
   var sql = "select * from blog";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('blog.ejs', {
                // title: All Jobs
                blogshow: result
            });
    // console.log(result[0]);
  });
})

// get data of inserted bidding rates admin page
router.get('/show-bids', [
], (req, res) => {
   var sql = "select * from bidding";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('biddingadmin.ejs', {
                // title: All Jobs
                bidshow: result
            });
    // console.log(result[0]);
  });
})

// get data of inserted bidding rates on customer page
router.get('/show-bidscust', [
], (req, res) => {
   var sql = "select * from bidding";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('bidding.ejs', {
                // title: All Jobs
                bidshowcust: result
            });
    // console.log(result[0]);
  });
})

// get data of inserted blogs on customer page
router.get('/show-blogs-cust', [
], (req, res) => {
   var sql = "select * from blog";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('custblog.ejs', {
                // title: All Jobs
                blogshowcust: result
            });
    // console.log(result[0]);
  });
})

// get data of inserted admin products on same admin page
router.get('/show-admin-freelance', [
], (req, res) => {
   var sql = "select * from freelance";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('freelanceadmin.ejs', {
                // title: All Jobs
                addfreelance: result
            });
    // console.log(result[0]);
  });
})

// get data of inserted admin online course on same admin page
router.get('/show-admin-course', [
], (req, res) => {
   var sql = "select * from online_course";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('onlinecourseadmin.ejs', {
                // title: All Jobs
                admincourse: result
            });
    // console.log(result[0]);
  });
})

// get data of inserted admin college project on same admin page
router.get('/show-admin-colpro', [
], (req, res) => {
   var sql = "select * from college_project";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('collegeprojectadmin.ejs', {
                // title: All Jobs
                colproj: result
            });
    // console.log(result[0]);
  });
})

// get data of inserted admin consultancy job openings on same admin page
router.get('/show-admin-jobs', [
], (req, res) => {
   var sql = "select * from job_openings";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('jobopeningsadmin.ejs', {
                // title: All Jobs
                adminjob: result
            });
    // console.log(result[0]);
  });
})

// get data of inserted admin reseller hosting on same admin page
router.get('/show-admin-reseller', [
], (req, res) => {
   var sql = "select * from reseller_hosting";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('resellerhostingadmin.ejs', {
                // title: All Jobs
                reseller: result
            });
    // console.log(result[0]);
  });
})

// get data of inserted admin reseller hosting on same admin page
router.get('/show-admin-resume', [
], (req, res) => {
   var sql = "select * from resume";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('jobservicesadmin.ejs', {
                // title: All Jobs
                resume: result
            });
    // console.log(result[0]);
  });
})

// get data of inserted admin reseller hosting on same admin page
router.get('/show-dm-offer', [
], (req, res) => {
   var sql = "select * from dmoffer";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('dmoffer.ejs', {
                // title: All Jobs
                dmoffer: result
            });
    // console.log(result[0]);
  });
})

// get data of online customer to admin side
router.get('/show-onlinecust', [
], (req, res) => {
   var sql = "select * from online_cust_reg";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('admin/it.ejs', {
                // title: All Jobs
                itcust: result
            });
    // console.log(result[0]);
  });
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  
  // res.render('/jobs.ejs')
})

// get data of online infotech student to admin side
router.get('/show-infotechuser', [
], (req, res) => {
   var sql = "select * from student_registration";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('infotech.ejs', {
                // title: All Jobs
                infotech: result
            });
    // console.log(result[0]);
  });
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  
  // res.render('/jobs.ejs')
})

// get data of online freelancer to admin side
router.get('/show-freelancer', [
], (req, res) => {
   var sql = "select * from freelancecomp_reg";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('freelancing.ejs', {
                // title: All Jobs
                freelancer: result
            });
    // console.log(result[0]);
  });
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  
  // res.render('/jobs.ejs')
})
// get data of online consultancy student to admin side
router.get('/show-constud', [
], (req, res) => {
   var sql = "select * from online_placement";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('consultancy.ejs', {
                // title: All Jobs
                constud: result
            });
    // console.log(result[0]);
  });
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  
  // res.render('/jobs.ejs')
})

// get data of online digital marketing signup data to admin side
router.get('/show-dmreg', [
], (req, res) => {
   var sql = "select * from dm_reg";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('digital_marketing.ejs', {
                // title: All Jobs
                dmreg: result
            });
    // console.log(result[0]);
  });
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  
  // res.render('/jobs.ejs')
})



//delete for admin product list
router.get('/deleteProduct/:id', [
], (req, res) => {

  var sql = "DELETE FROM `products` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-onlineprod')
})


//delete for admin product list
router.get('/delete-admin-Product/:id', [
], (req, res) => {

  var sql = "DELETE FROM `products` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-onlineprod')
})

//delete for admin Blog list
router.get('/delete-admin-blog/:id', [
], (req, res) => {

  var sql = "DELETE FROM `blog` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-blogs')
})

//delete for admin dmoffer list
router.get('/delete-admin-dmoffer/:id', [
], (req, res) => {

  var sql = "DELETE FROM `dmoffer` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-dm-offer')
})

//delete for admin freelance project list
router.get('/delete-admin-freelance/:id', [
], (req, res) => {

  var sql = "DELETE FROM `freelance` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-admin-freelance')
})

//delete for admin reseller-hosting list
router.get('/delete-admin-reseller/:id', [
], (req, res) => {

  var sql = "DELETE FROM `reseller_hosting` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-admin-reseller')
})

//delete for admin online course list
router.get('/delete-admin-onlinecourse/:id', [
], (req, res) => {

  var sql = "DELETE FROM `online_course` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-admin-course')
})

//delete for admin college project list
router.get('/delete-admin-colpro/:id', [
], (req, res) => {

  var sql = "DELETE FROM `college_project` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-admin-colpro')
})

//delete for admin college project list
router.get('/delete-admin-jobs/:id', [
], (req, res) => {

  var sql = "DELETE FROM `job_openings` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-admin-jobs')
})

//delete for admin resume list
router.get('/delete-admin-resume/:id', [
], (req, res) => {

  var sql = "DELETE FROM `resume` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-admin-resume')
})

//delete for admin IT Customer signup data
router.get('/delete-admin-onlinecust/:id', [
], (req, res) => {

  var sql = "DELETE FROM `online_cust_reg` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-onlinecust')
})

//delete for admin Infotech Customer signup data
router.get('/delete-admin-infostud/:id', [
], (req, res) => {

  var sql = "DELETE FROM `student_registration` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-infotechuser')
})

//delete for admin Infotech Customer signup data
router.get('/delete-admin-freelancecust/:id', [
], (req, res) => {

  var sql = "DELETE FROM `freelancecomp_reg` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-freelancer')
})

//delete for admin consultancy Customer signup data
router.get('/delete-admin-conslcust/:id', [
], (req, res) => {

  var sql = "DELETE FROM `online_placement` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-constud')
})

//delete for admin DM customer signup data
router.get('/delete-admin-dmcust/:id', [
], (req, res) => {

  var sql = "DELETE FROM `dm_reg` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
  
  // req.flash('success', 'Thanks for the message! I‘ll be in touch :)')
  res.redirect('/show-dmreg')
})

// login verify customer side and go on next page
router.post('/login', [
], (req, res) => {
   var sql = "select * from login where uname='"+req.body.uname+"' && pass='"+req.body.pass+"'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    let user_type=result[0].type;
    req.session.user = req.body.uname;
      console.log(req.session.user);
    if (user_type=="dm") {
      // res.render("dmpage.ejs",{layout:false,
      // session: req.session});
      res.redirect("/dmpage");
    }
    if (user_type=="it") {
      // res.render("onlinesale.ejs",{layout:false,
      // session: req.session});
      res.redirect("/show-prod");  
    }
    if (user_type=="infotech") {
      // res.render("onlinecourse.ejs",{layout:false,
      // session: req.session});
      res.redirect("/show-course");  
    }
    if (user_type=="consultancy") {
      // res.render("jobs.ejs",{layout:false,
      // session: req.session});
      res.redirect("/show-job");  
    }
    if (user_type=="freelance") {
      // res.render("customer-freelance-jobs.ejs",{layout:false,
      // session: req.session});
      res.redirect("/show-freelance-job");  
    }
    
  });

})

// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect("login.html");
});



// login verify admin side and go on main page
router.post('/adminlogin', [
], (req, res) => {
   var sql = "select * from adminlogin where uname='"+req.body.uname+"' && pass='"+req.body.pass+"'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    let usname=result[0].uname;
   //console.log(result[0]);
     
    if (usname=="Ashfaq") {
      res.redirect("admin/index1.html");  
    }
    // if (user_type=="freelancer") {
    //   res.redirect("freelancing.html");  
    // }


    // console.log(result[0]);
  });

})


/* Update functionality code below */

//edit for admin product list
router.get('/edit-admin-Product/:id', [
], (req, res) => {

  var sql = "select * FROM `products` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    res.render('onlinesaleadminEdit.ejs', {
                onlinepro: result
            });
    console.log("1 record edit");
  });

})

//product data update of admin
router.post('/update-products', [
], (req, res) => {
  if (req.body.file) {
    var sql = "UPDATE products SET pname='"+req.body.pname+"', pprice='"+req.body.pprice+"', file='"+req.body.file+"' WHERE id='"+req.body.id+"'";
  }
  var sql = "UPDATE products SET pname='"+req.body.pname+"', pprice='"+req.body.pprice+"' WHERE id='"+req.body.id+"'";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
  });
  res.redirect('/show-onlineprod')

})

//edit for admin freelaner projects list
router.get('/edit-admin-freelance/:id', [
], (req, res) => {

  var sql = "select * FROM `freelance` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    res.render('freelanceadminEdit.ejs', {
                addfreelance: result
            });
    console.log("1 record edit");
  });

})

//update freelance projects data of admin
router.post('/update-freelance', [
], (req, res) => {
  if (req.body.file) {
    var sql = "UPDATE freelance SET prname='"+req.body.prname+"', prdetails='"+req.body.prdetails+"', prfile='"+req.body.prfile+"' WHERE id='"+req.body.id+"'";
  }
  var sql = "UPDATE freelance SET prname='"+req.body.prname+"', prdetails='"+req.body.prdetails+"' WHERE id='"+req.body.id+"'";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
  });
  res.redirect('/show-admin-freelance')

})

//edit for admin online course list
router.get('/edit-admin-onlinecourse/:id', [
], (req, res) => {

  var sql = "select * FROM `online_course` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    res.render('onlinecourseadminEdit.ejs', {
                admincourse: result
            });
    console.log("1 record edit");
  });

})

//update online course data of admin
router.post('/update-onlinecourse', [
], (req, res) => {
  if (req.body.file) {
    var sql = "UPDATE online_course SET cname='"+req.body.cname+"', cduration='"+req.body.cduration+"', cfees='"+req.body.cfees+"', cfile='"+req.body.cfile+"' WHERE id='"+req.body.id+"'";
  }
  var sql = "UPDATE online_course SET cname='"+req.body.cname+"', cduration='"+req.body.cduration+"', cfees='"+req.body.cfees+"' WHERE id='"+req.body.id+"'";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
  });
  res.redirect('/show-admin-course')

})

//edit for admin college project list
router.get('/edit-admin-collegeproject/:id', [
], (req, res) => {

  var sql = "select * FROM `college_project` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    res.render('collegeprojectadminEdit.ejs', {
                colproj: result
            });
    console.log("1 record edit");
  });

})

//update college project data of admin
router.post('/update-collegeproject', [
], (req, res) => {
  if (req.body.file) {
    var sql = "UPDATE college_project SET pname='"+req.body.pname+"', pprice='"+req.body.pprice+"', pfile='"+req.body.pfile+"' WHERE id='"+req.body.id+"'";
  }
  var sql = "UPDATE college_project SET pname='"+req.body.pname+"', pprice='"+req.body.pprice+"' WHERE id='"+req.body.id+"'";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
  });
  res.redirect('/show-admin-colpro')

})

//edit for admin college project list
router.get('/edit-admin-jobopening/:id', [
], (req, res) => {

  var sql = "select * FROM `job_openings` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    res.render('jobopeningsadminEdit.ejs', {
                adminjob: result
            });
    console.log("1 record edit");
  });

})

//update college project data of admin
router.post('/update-jobopening', [
], (req, res) => {
  
  var sql = "UPDATE job_openings SET cmname='"+req.body.cmname+"', skills='"+req.body.skills+"', jd='"+req.body.jd+"', jlocation='"+req.body.jlocation+"', jsalary='"+req.body.jsalary+"', jexp='"+req.body.jexp+"', jeleg='"+req.body.jeleg+"' WHERE id='"+req.body.id+"'";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
  });
  res.redirect('/show-admin-jobs')

})


//edit for admin blog list
router.get('/edit-admin-blog/:id', [
], (req, res) => {

  var sql = "select * FROM `blog` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    res.render('blogadminEdit.ejs', {
                adminblog: result
            });
    console.log("1 record edit");
  });

})

//update blog data of admin
router.post('/update-blogs', [
], (req, res) => {
  
  var sql = "UPDATE blog SET bname='"+req.body.bname+"', auth='"+req.body.auth+"', bfile='"+req.body.bfile+"' WHERE id='"+req.body.id+"'";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
  });
  res.redirect('/show-blogs')

})

//edit for admin dmoffer list
router.get('/edit-admin-dmoffer/:id', [
], (req, res) => {

  var sql = "select * FROM `dmoffer` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    res.render('dmofferadminEdit.ejs', {
                admindmoffer: result
            });
    console.log("1 record edit");
  });

})

//update dmoffer data of admin
router.post('/update-dmoffer', [
], (req, res) => {
  
  var sql = "UPDATE blog SET bname='"+req.body.bname+"', auth='"+req.body.auth+"', bfile='"+req.body.bfile+"' WHERE id='"+req.body.id+"'";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
  });
  res.redirect('/show-dm-offer')

})


//edit for admin resume list
router.get('/edit-admin-resume/:id', [
], (req, res) => {

  var sql = "select * FROM `resume` WHERE `id`=?";
  
  con.query(sql, [req.params.id] , function (err, result) {
    if (err) throw err;
    res.render('jobservicesadminEdit.ejs', {
                adminresume: result
            });
    console.log("1 record edit");
  });

})

//update resume data of admin
router.post('/update-resume', [
], (req, res) => {
  
  var sql = "UPDATE resume SET type='"+req.body.type+"', rfile='"+req.body.rfile+"' WHERE id='"+req.body.id+"'";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
  });
  res.redirect('/show-admin-resume')

})


app.use('/', router);
app.listen(process.env.port || 3003);

console.log('Running at Port 3003');
