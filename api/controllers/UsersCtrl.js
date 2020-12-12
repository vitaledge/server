'use strict';

var mongoose = require('mongoose'),
arraySort = require('array-sort'),
Products = mongoose.model('Products'),
Transactions = mongoose.model('Transactions'),
Driver = mongoose.model('Driver'),
driverNotifications = mongoose.model('driverNotifications'),
Coupons = mongoose.model('Coupons'),
Addresses = mongoose.model('Addresses'),
Admin = mongoose.model('Admin'),
Notifications = mongoose.model('Notifications'),
Users = mongoose.model('Users'),
OTP = mongoose.model('OTP'),
Address = mongoose.model('Address'),
Cards = mongoose.model('Cards'),
Orders = mongoose.model('Orders'),
Sellers = mongoose.model('Sellers'),
Cart = mongoose.model('Cart'),
Extras = mongoose.model('Extras'),
Wallet = mongoose.model('Wallet'),
ForgotEmail = mongoose.model('ForgotEmail'),
path = require('path'),
NodeGeocoder = require('node-geocoder'),
fs = require('fs');
var passwordHash = require('password-hash');
var otpGenerator = require('otp-generator');
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var errors = ['', null, undefined]
var options = {
  provider: 'google',
  httpAdapter: 'https', 
  apiKey: 'AIzaSyDQq-y8AHIcdfPGNKpR9BCyFCVkLd2bFws',
  formatter: null        
};
var geocoder = NodeGeocoder(options);

var crypto = require("crypto")
var key = "veg@!pass$enc&decrpt";

var plivo = require('plivo');
var p = plivo.RestAPI({
  authId: 'MANZLKNJGZYJK5ZGRIOG',
  authToken: 'ZTNkZDM0ZTA5OGU4ODI4Y2E4NDAwNjM2OTcwODM0'
});
var multer  = require('multer');

var storageForSellers = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'data/seller/')
  },
  filename: function(req, file, cb) {
       var fileExtn = file.originalname.split('.').pop(-1);
      cb(null, new Date().getTime() + '.' + fileExtn);
      }
});

var storageForUsers = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'data/users/')
  },
  filename: function(req, file, cb) {
       var fileExtn = file.originalname.split('.').pop(-1);
      cb(null, new Date().getTime() + '.' + fileExtn);
      }
});

var storageForDriver = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'data/driver/')
  },
  filename: function(req, file, cb) {
       var fileExtn = file.originalname.split('.').pop(-1);
      cb(null, new Date().getTime() + '.' + fileExtn);
      }
});

var FCM = require('fcm-node');
var serverKey = 'AAAAt5ic2Zg:APA91bFoRielfJLbdanKIbxFbHjlPyMpubO_wNN2QsNz__HSf6n6qCF8vOB6QA8aUa_SvnZqVjUVarDI9XRQ4gf1W2S-WjpmFjRz9_-p8c1TvV2YyDHpz5Y9svQe1P5cs0dAHaM2D_Fp'; //put your server key here
var fcm = new FCM(serverKey);


// start admin controller
exports.dashboard = async function(req, res) {

  if(req.body.type==1){
var  noOfProducts = await  Products.count({});
var  noOfOrders  = await  Orders.count({});
 
}else{
var  noOfProducts = await  Products.count({storeId : req.body._id});
var  noOfOrders  = await  Orders.count({sellerId: req.body._id});
 
}

var  noOfBuyers  = await  Users.count({});
var  noOfSellers = await  Sellers.count({not_admin:'1'});



res.send({
noOfBuyers : noOfBuyers,
noOfSellers:noOfSellers,
noOfOrders:noOfOrders,
noOfProducts:noOfProducts
})

};

//forgot account
exports.forgotAccount = function(req, res) {

  Sellers.findOne({email: req.body.email, not_admin:1 }, function(err, user1) {
   if(user1!=null){
    var OTP= otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets:false });
    var newForgotPassword = new ForgotEmail({otp: OTP, email: req.body.email});
    newForgotPassword.save();
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('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');
    const msg = {
      to: req.body.email,
      from: 'info@crunchtime.com', // Use the email address or domain you verified above
      subject: 'Forgot password',
      text: 'Dear User, you have requested to reset the password for your acccount, Please enter following OTP to reset you password: '+OTP,
      html: 'Dear User, you have requested to reset the password for your acccount, Please enter following OTP to reset you password: '+OTP,
    };
    //ES6
    sgMail
      .send(msg)
      .then(() => {}, error => {
        console.error(error);
     
        if (error.response) {
          console.error(error.response.body)
        }
      });
    //ES8
    (async () => {
      try {
        var mailresult =  await sgMail.send(msg);
        console.log(mailresult);
        res.send({
          status : 1 
          })
    
      } catch (error) {
        res.send({
          status : 0
          })
        console.error(error);
     
        if (error.response) {
          console.error(error.response.body)
        }
      }
    })();

   }else{
    res.send({
      status : 5
      })

   }


  })



}


//forgot account
exports.forgotAccountUser = function(req, res) {

  Users.findOne({email: req.body.email}, function(err, user1) {
   if(user1!=null){
    var OTP= otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets:false });
    var newForgotPassword = new ForgotEmail({otp: OTP, email: req.body.email});
    newForgotPassword.save();
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('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');
    const msg = {
      to: req.body.email,
      from: 'info@crunchtime.com', // Use the email address or domain you verified above
      subject: 'Forgot password',
      text: 'Dear User, you have requested to reset the password for your acccount, Please enter following OTP to reset you password: '+OTP,
      html: 'Dear User, you have requested to reset the password for your acccount, Please enter following OTP to reset you password: '+OTP,
    };
    //ES6
    sgMail
      .send(msg)
      .then(() => {}, error => {
        console.error(error);
     
        if (error.response) {
          console.error(error.response.body)
        }
      });
    //ES8
    (async () => {
      try {
        var mailresult =  await sgMail.send(msg);
        console.log(mailresult);
        res.send({
          status : 1 
          })
    
      } catch (error) {
        res.send({
          status : 0
          })
        console.error(error);
     
        if (error.response) {
          console.error(error.response.body)
        }
      }
    })();

   }else{
    res.send({
      status : 5
      })

   }


  })



}

exports.resetpassword = function(req, res){
  console.log(req.body.npassword);
  ForgotEmail.findOne({email:req.body.email}, null, {sort:{'_id': -1}}, function(err, user) {
    
        
     if(user==null){
      res.send({
        msg: 'Internal Server Error, Try again',
        status: 0,
        data: null
      });
    }else{             
       confirmOtp(req.body.otp,user.otp);
      }

});

function confirmOtp(frontOtp,backOtp){
  if(frontOtp==backOtp){
     changePassword();

  }else{
        res.send({
        msg: 'Provided OTP is wrong',
        status: 2,
        data: null
      });
  }

}

function changePassword(){
  
  Sellers.update({ email: req.body.email}, { $set: { password : encrypt(key,req.body.password) }}, {new: true}, function(err, user) {
       if(user==null){
            res.send({
            msg: 'Internal Server Error, Try again',
            status: 3,
            data: user
            });
    
       }else{
        res.send({
        msg: 'password changed successfully',
        status: 1,
        data: user
        });
      }

   });
}
}


exports.resetpasswordUser = function(req, res){
 
  ForgotEmail.findOne({email:req.body.email}, null, {sort:{'_id': -1}}, function(err, user) {
     if(user==null){
      res.send({
        msg: 'Internal Server Error, Try again',
        status: 0,
        data: null
      });
    }else{             
       confirmOtp(req.body.otp,user.otp);
      }

});

function confirmOtp(frontOtp,backOtp){
  if(frontOtp==backOtp){
     changePassword();

  }else{
        res.send({
        msg: 'Provided OTP is wrong',
        status: 2,
        data: null
      });
  }

}

function changePassword(){
  
  Users.update({ email: req.body.email}, { $set: { password : encrypt(key,req.body.password) }}, {new: true}, function(err, user) {
       if(user==null){
            res.send({
            msg: 'Internal Server Error, Try again',
            status: 3,
            data: user
            });
    
       }else{
        res.send({
        msg: 'password changed successfully',
        status: 1,
        data: user
        });
      }

   });
}
}


exports.directResetPasswordUser = function(req, res){

  Users.findOne({_id: req.body._id, password: encrypt(key,req.body.oPassword) }, function(err, user) {
    if (user == null){
      res.send({
       error: err,
       status: 0,
       data: null
     });
   }else{
    Users.update({ _id: req.body._id}, { $set: { password : encrypt(key,req.body.password) }}, {new: true}, function(err, user) {
      if(user==null){
           res.send({
           msg: 'Internal Server Error, Try again',
           status: 3,
           data: user
           });
   
      }else{
       res.send({
       msg: 'password changed successfully',
       status: 1,
       data: user
       });
     }
  
  });
   }
 });

}

exports.getAccountIds = async function(req, res) {

  Sellers.findOne({_id: req.body.sellerId}, function(err, sellerLatlong){

    Sellers.findOne({_id: '5ef17edab2dd8d090513c8e2'}, function(err, seller1){
      res.send({
        status: 1,
        data :{
          sellerId: sellerLatlong.accountCode,
          accountKey: sellerLatlong.accountKey,
          adminId: seller1.accountCode
        }
        });
      })
    })

}

exports.checkDistance = async function(req, res) {

  Addresses.findOne({_id: req.body.addressId}, function(err, userLatlong){
  Sellers.findOne({_id: req.body.sellerId}, function(err, sellerLatlong){
    console.log(userLatlong, userLatlong)
    if(userLatlong!=null && sellerLatlong!=null){
      getDistanceFromLatLonInKm(userLatlong.lat, userLatlong.lng, sellerLatlong.lat, sellerLatlong.lng);
    }else{
  
      res.send({
        status: 0
        });
    }
    })
  })

  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km

    res.send({
      data: d,
      status: 1 
      });

  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
 
};


exports.updateSellerAccount = function(req, res) { 
   
  var upload = multer({ storage: storageForSellers }).single('file');
  upload(req,res,function(err){
      
      var querydata = {
        store_name: req.body.store_name,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        email: req.body.email,
        pin: req.body.pin,
        lat: req.body.lat,
        lng: req.body.lng,
        accountCode: req.body.accountCode,
        accountKey: req.body.accountKey,
          }
      if(errors.indexOf(req.file)==-1){
        querydata['image'] = req.file.filename;

        }
   
          Sellers.update({_id: req.body._id},{$set:querydata},{new:true}, function(err, user) {
               
            if(user==null){
               res.send({
               msg: 'Internal Server Error, Try again',
               status: 0}); 
            }else{

              Sellers.findOne({_id:req.body._id}, function(err, user) { 
                 if(user==null){
                 res.send({
                 msg: 'Internal Server Error, Try again',
                 status: 0,
                 data: null
                 });
                 }else{             
                 res.send({
               msg: 'Data has been updated',
               status: 1,
               data:user

               }); 
             
                }

           });

          }   
         });
                          
  });
  }


  exports.updateUsersAccount = async function(req, res) { 

    var emailExists = await  Users.findOne({_id: {$ne: req.params._id}, email: req.params.email});
    var phoneExists = await  Users.findOne({_id: {$ne: req.params._id}, phone: req.params.phone});

    if(emailExists!=null){
      res.send({
        status: 2,
        }); 

    }else if(phoneExists!=null){
      res.send({
        status: 3,
        }); 
    }else{
      var upload = multer({ storage: storageForUsers }).single('file');
      upload(req,res,function(err){
          var querydata = {
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            email: req.body.email
              }
          if(errors.indexOf(req.file)==-1){
            querydata['image'] = req.file.filename;
    
            }
       
                Users.update({_id: req.body._id},{$set:querydata},{new:true}, function(err, user) {
                   
                    if(user==null){
                      res.send({
                      msg: 'Internal Server Error, Try again',
                      status: 0}); 
                    }else{
        
                      Users.findOne({_id:req.body._id}, function(err, user) { 
                        if(user==null){
                        res.send({
                        msg: 'Internal Server Error, Try again',
                        status: 0,
                        data: null
                        });
                        }else{             
                        res.send({
                      msg: 'Data has been updated',
                      status: 1,
                      data:user
                      }); 
                    
                        }
        
                  });
        
                  }   
             });
                              
      });

    }

   

    }


// start admin controller
exports.loginAdmin = function(req, res) {
  console.log(req.body);
  Users.findOne({email:req.body.email, type:0}, function(err, admin) {
   console.log(admin);
     if (admin == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
       var CheckPassword = decrypt(key,admin.password);
          if(CheckPassword == req.body.password ){
                  res.json({
                      error: null,
                      status: 1,
                      data: admin
                  });
                }else{
                   res.send({
                      error: err,
                      status: 2,
                      data: null
                    });

                }
    }
    
  });
};

exports.createAdmin = function(req, res) {
  var new_admin = new Admin({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    image: req.body.image,
    password: encrypt(key,req.body.password),
    phone: req.body.phone
  });

  new_admin.save(function(err, admin) {
    if (admin == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
       res.json({
          error: null,
          status: 1,
          data: admin
      });
    }
  });
};

// start user controller
exports.loginUser = function(req, res) {

  console.log(req.body)
  Users.findOne({email: req.body.phone, password: encrypt(key, req.body.password)}, function(err, user) {
    
     if (user == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{

      Users.update({ _id: user._id }, { $set: { token: req.body.token }}, {new: true}, function(err, task) {
        res.send({
          error: null,
          status: 1,
          data: user
         });
       });
   }
  });
};


exports.loginDriver = function(req, res) {
  Driver.findOne({email: req.body.phone, password: encrypt(key, req.body.password)}, function(err, user) {
    
     if (user == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{

      Driver.update({ _id: user._id }, { $set: { token: req.body.token }}, {new: true}, function(err, task) {
        res.send({
          error: null,
          status: 1,
          data: user
         });
       });
   }
  });
};
// start user controller
exports.addAddresses = function(req, res) {
  var data = {
    userId: req.body._id,
    address: req.body.address,
    lat: req.body.lat,
    lng: req.body.lng
  }
  var newAddress = new Addresses(data)
  newAddress.save(function(err, user) {
     if (user == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      res.send({
        error: null,
        status: 1,
        data: user
      });
    }
  });
};


exports.editAddress = function(req, res) {
  Addresses.update({_id: req.body._id},{$set: {address: req.body.address, lat:req.body.lat, lng: req.body.lng }}, function(err, user) {
     if (user == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      res.send({
        error: null,
        status: 1,
        data: user
      });
    }
  });
};

// start user controller
exports.getUserAddresses = function(req, res) {
 
  Addresses.find({userId: req.body._id, status:'1'}, function(err, user) {
     if (user.length==0){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      res.send({
        error: null,
        status: 1,
        data: user
      });
    }
  });
};

exports.removeAddresses = function(req, res) {
 
  Addresses.update({userId: req.body._id, _id: req.body.id}, {$set: {status: '0'}}, function(err, user) {
     if (user==null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      res.send({
        error: null,
        status: 1,
        data: user
      });
    }
  });
};

exports.pfpay = function(req, res) {
 
  res.sendFile(path.join(__dirname, '../templates') + '/pay.html', 'utf8'); 
};

exports.orderNow = async function(req, res) {
  console.log(req.query)
  var CartData = await Cart.findOne({_id: req.query.cartId});
  var addessInfo = await Addresses.findOne({_id: req.query.address});
  var sellerInfor = await Sellers.findOne({_id: req.query.sellerId});
  var buyersInfor = await Users.findOne({_id: req.query.userId});

  var orderData = {
    userId: req.query.userId,
    sellerId: req.query.sellerId,
    driverId: '0',
    payment_mode: 'pf',
    payable_price: req.query.price,
    cart_items: CartData.items,
    address: addessInfo.address,
    delivery_status: 0,
    cartId: req.query.cartId,
    address_id: req.query.address,
    extraStuff: CartData.extraStuff,
    orderDate: CartData.orderDate,
    orderTime: CartData.orderTime,
    orderMode: CartData.orderMode,
  } 

  var newOrder = new Orders(orderData)
  newOrder.save(function(err, response){

    if (response==null){
      res.send({
       error: err,
       status: 0,
       data: null
     });
   }else{


     var adminAmount = (15/100)*req.query.price
     var AdminTransaction = {
      toId: '5ef17edab2dd8d090513c8e2',
      orderId: response._id,
      amount: adminAmount
     }

      var newAdminAmount  = new Transactions(AdminTransaction)

      newAdminAmount.save();

      var sellerAmount = (80/100)*req.query.price
      var sellerTransaction = {
       toId: req.query.sellerId,
       orderId: response._id,
       amount: sellerAmount
      }
 
       var newSellerAmount  = new Transactions(sellerTransaction)
 
       newSellerAmount.save();

     var data = {
      type: 1,
      to: req.query.userId,
      from: req.query.sellerId,
      items: {
        order_id: response._id,
      }
     }

     addNotification(data)
     
    res.sendFile(path.join(__dirname, '../templates') + '/order_done.html', 'utf8' ); 

    var handlebars = require('handlebars');
    var fs = require('fs');
      var readHTMLFile = function(path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };
  var nodemailer = require('nodemailer');
  var smtpTransport = require('nodemailer-smtp-transport');

  var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: 'noreply.crunchtime@gmail.com',
    pass: 'admin@1234'
  }
  }));

  ///
  readHTMLFile(__dirname + '/../templates/orderPlaced.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
      "orderNumber": response._id
    };

    var htmlToSend = template(replacements);
    var mailOptions = {
      from: 'Crunch Time <noreply.crunchtime@gmail.com>',
        to: buyersInfor.email,
        subject: 'Order Placed',
        html : htmlToSend
     };
     transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log('email eror', error)
 
        }else{
          console.log('email response', response)
            // res.json({
            //     error: 'mail not sent.',
            //     status: 1,
            //     data: user
            // });
        }
    });
    });


  ///

  readHTMLFile(__dirname + '/../templates/order.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
      "user": sellerInfor.store_name,
      "orderNumber": response._id
    };

    var htmlToSend = template(replacements);
    var mailOptions = {
      from: 'Crunch Time <noreply.crunchtime@gmail.com>',
        to: sellerInfor.email,
        subject: 'New Order',
        html : htmlToSend
     };
     transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log('email eror', error)
          res.send({
            msg: 'Internal Server Error, Try again',
            status: 2,
            data: null
            });
        }else{
            // res.json({
            //     error: 'mail not sent.',
            //     status: 1,
            //     data: user
            // });
        }
    });
    });



   }
   
  });
};


exports.CODelivery = async function(req, res) {
  
  var CartData = await Cart.findOne({_id: req.body.cartId});
  var addessInfo = await Addresses.findOne({_id: req.body.address});
  var buyersInfor = await Users.findOne({_id: req.body.userId});

  var orderData = {
    userId: req.body.userId,
    sellerId: req.body.sellerId,
    driverId: '0',
    payment_mode: 'cod',
    payable_price: req.body.price,
    cart_items: CartData.items,
    address: addessInfo.address,
    delivery_status: 0, 
    cartId: req.body.cartId,
    address_id: req.body.address,
    extraStuff: CartData.extraStuff,
    orderDate: CartData.orderDate,
    orderTime: CartData.orderTime,
    orderMode: CartData.orderMode,
  } 

  var newOrder = new Orders(orderData)
  newOrder.save(function(err, response){

    if (response==null){
      res.send({
       error: err,
       status: 0,
       data: null
     });
   }else{
     
 

    Sellers.findOne({_id: req.body.sellerId}, function(err, sellerInfo){

    var handlebars = require('handlebars');
    var fs = require('fs');
      var readHTMLFile = function(path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };
  var nodemailer = require('nodemailer');
  var smtpTransport = require('nodemailer-smtp-transport');

  var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: 'noreply.crunchtime@gmail.com',
    pass: 'admin@1234'
  }
  }));

  readHTMLFile(__dirname + '/../templates/order.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
      "user": sellerInfo.store_name,
    };

    var htmlToSend = template(replacements);
    var mailOptions = {
      from: 'Crunch Time <noreply.crunchtime@gmail.com>',
        to: sellerInfo.email,
        subject: 'New Order',
        html : htmlToSend
     };
     transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
 
        }else{
  
        }
    });
    });


    readHTMLFile(__dirname + '/../templates/orderPlaced.html', function(err, html) {
      var template = handlebars.compile(html);
      var replacements = {
        "orderNumber": response._id
      };
  
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: 'Crunch Time <noreply.crunchtime@gmail.com>',
          to: buyersInfor.email,
          subject: 'Order Placed',
          html : htmlToSend
       };
       transporter.sendMail(mailOptions, function (error, response) {
          if (error) {
            console.log('email eror', error)
   
          }else{
            console.log('email response', response)
              // res.json({
              //     error: 'mail not sent.',
              //     status: 1,
              //     data: user
              // });
          }
      });
      });
  


     });

    var data = {
      type: 1,
      to: req.body.userId,
      from: req.body.sellerId,
      items: {
        order_id: response._id,
      }
     }

     addNotification(data)


     var adminAmount = (15/100)*req.body.price
     var AdminTransaction = {
      toId: '5ef17edab2dd8d090513c8e2',
      orderId: response._id,
      amount: adminAmount
     }

      var newAdminAmount  = new Transactions(AdminTransaction)

      newAdminAmount.save();

      var sellerAmount = (80/100)*req.body.price
      var sellerTransaction = {
       toId: req.body.sellerId,
       orderId: response._id,
       amount: sellerAmount
      }
 
       var newSellerAmount  = new Transactions(sellerTransaction)
 
       newSellerAmount.save();

    res.send({
      status: 1
    });
   }
   
  });
};


exports.checkCart = async function(req, res) {
 
  var cartExist = await Orders.findOne({userId: req.body.userId, cartId: req.body.cartId});

  if(cartExist!=null){
    res.send({
      status: 1
    });
  }else{
    res.send({
      status: 0
    });
  }

};

exports.check_user = function(req, res) {
  Users.findOne({phone:req.body.phone, country_code:req.body.country_code}, function(err, check) {
   if(check == null)
   { 
      var otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp)
       var params = {
          'dst': req.body.country_code+req.body.phone, 
          'src' : '+919779380328', 
          'text' : "Your CrunchTime OTP is "+otp, 
          'method' : "GET" 
        };

        p.send_message(params, function (status, response) {
          OTP.remove({country_code: req.body.country_code,phone: req.body.phone}, function(err, task) {
              var new_otp = new OTP({
                  country_code: req.body.country_code,
                  phone: req.body.phone,
                  otp: otp,
                  user_type: 'user'
                });

              new_otp.save(function(err, newotp) {
                if (otp == null){
                   res.send({
                    error: err,
                    status: 0,
                    data: null
                  });
                }else{
                  res.send({
                    error: null,
                    status: 1,
                    data: null
                  });
                }
              });
            });
        });   
   }
   else
   {
      res.json({
        error: null,
        status: 2,
        data: check
      });
   }
  });
};

exports.verify_OTP = function(req, res) {
  OTP.findOne({phone:req.body.phone, country_code:req.body.country_code,user_type:req.body.user_type}, function(err, check) {
   if(check == null)
   {
    res.send({
      error: null,
      status: 0,
      data: null
    });
   }
   else
   {
    if(check.otp == req.body.otp)
    {
      res.send({
        error: null,
        status: 1,
        data: null
      });
    }
    else
    {
      res.send({
        error: null,
        status: 2,
        data: null
      });
    }
   }
 });
};

exports.create_user = function(req, res) {
 
    Users.findOne({email:req.body.email}, function(err, check1) {
      if(check1 == null)
      {
      var new_user = new Users({
      name: req.body.name,
      email: req.body.email,
      country_code: req.body.country_code,
      password: encrypt(key,req.body.password),
      status: 1,
      image: null,
      token: req.body.token,
      referCode: randomString(6),
      money: 0,
      registered_on: new Date(),
    });

    new_user.save(function(err, user) {
      if (user == null){
         res.send({
          error: err,
          status: 0,
          data: null
        });
      }else{
        var readStream = fs.createReadStream(path.join(__dirname, '../templates') + '/signup.html', 'utf8');
        let dynamic_content = ''
        readStream.on('data', function(chunk) {
            dynamic_content += chunk;
        }).on('end', function() {
          var helper = require('sendgrid').mail;
          var fromEmail = new helper.Email('info@CrunchTime.com','CrunchTime');
          var toEmail = new helper.Email(req.body.email);

          var subject = 'Account Registration';
          dynamic_content = dynamic_content.replace("#password#", req.body.password);
          dynamic_content = dynamic_content.replace("#username#", req.body.email);
          dynamic_content = dynamic_content.replace("#user#", req.body.name);
          var content = new helper.Content('text/html', dynamic_content);

          var mail = new helper.Mail(fromEmail, subject, toEmail, content);
          var sg = require('sendgrid')('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');
          var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
          });

          sg.API(request, function (error, response) {
            if (error) {
              res.json({
                  error: 'mail not sent.',
                  status: 1,
                  data: user
              });
            }

            //check if registered by refer code
            if(req.body.referalCode != undefined) {
              Users.findOne({referCode: req.body.referalCode}, function(err, check_referal) {
                if(check_referal != null){
                  Users.findOne({ _id: check_referal._id }, function(err, ref_user) {
                    var ref_amount = Number(ref_user.money) + 100;
                    Users.update({ _id: check_referal._id }, { $set: { money: ref_amount }}, {new: true}, function(err, task) {
                      var new_wallet = new Wallet({
                          userId: check_referal._id,
                          type: '1',
                          money_type: 'in',
                          amount: 100,
                          others: {name: user.name},
                          date_created: new Date()
                        });
                      new_wallet.save(function(err, result) {
                        res.json({
                          error: null,
                          status: 1,
                          data: user
                        });
                      });
                    });
                  });
                }
              });
            }
            else{
              res.json({
                error: null,
                status: 1,
                data: user
              });
            }
          });
        });
      }
    });
      }
      else
      {
        res.json({
              error: null,
              status: 5,
              data: check
          });
      }
    });
    
 
};


exports.createDriver = function(req, res) {


  var upload = multer({ storage: storageForDriver }).single('file');
  upload(req,res,function(err){
   
    Driver.findOne({phone:req.body.phone, status: 1}, function(err, check) {
      if(check == null)
      {
       Driver.findOne({email:req.body.email, status: 1}, function(err, check1) {
         if(check1 == null)
         {

         var assocs = [];  
         for(let key of JSON.parse(req.body.associateSeller)){
           if(assocs.indexOf(key)==-1){
            assocs.push(key)
           }
         }
         var new_user = new Driver({
         sellerId: req.body.sellerId,
         name: req.body.name,
         phone: req.body.phone,
         email: req.body.email,
         city: req.body.city,
         state: req.body.state,
         pin: req.body.pin,
         password: encrypt(key,req.body.password),
         status: 1,
         image: req.file.filename,
         token: req.body.token,
         registered_on: new Date(),
         address:  req.body.address,
         lat: req.body.lat,
         lng: req.body.lng,
         associateSeller: assocs
       });
   
       new_user.save(function(err, user) {
         if (user == null){
            res.send({
             error: err,
             status: 0,
             data: null
           });
         }else{
           var readStream = fs.createReadStream(path.join(__dirname, '../templates') + '/signup.html', 'utf8');
           let dynamic_content = ''
           readStream.on('data', function(chunk) {
               dynamic_content += chunk;
           }).on('end', function() {
             var helper = require('sendgrid').mail;
             var fromEmail = new helper.Email('info@CrunchTime.com','CrunchTime');
             var toEmail = new helper.Email(req.body.email);
   
             var subject = 'Account Registration';
             dynamic_content = dynamic_content.replace("#password#", req.body.password);
             dynamic_content = dynamic_content.replace("#username#", req.body.email);
             dynamic_content = dynamic_content.replace("#user#", req.body.name);
             var content = new helper.Content('text/html', dynamic_content);
   
             var mail = new helper.Mail(fromEmail, subject, toEmail, content);
             var sg = require('sendgrid')('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');
             var request = sg.emptyRequest({
               method: 'POST',
               path: '/v3/mail/send',
               body: mail.toJSON()
             });
   
             sg.API(request, function (error, response) {
               if (error) {
                 res.json({
                     error: 'mail not sent.',
                     status: 1,
                     data: user
                 });
               }
   
               //check if registered by refer code
               if(req.body.referalCode != undefined) {
                 Users.findOne({referCode: req.body.referalCode}, function(err, check_referal) {
                   if(check_referal != null){
                     Users.findOne({ _id: check_referal._id }, function(err, ref_user) {
                       var ref_amount = Number(ref_user.money) + 100;
                       Users.update({ _id: check_referal._id }, { $set: { money: ref_amount }}, {new: true}, function(err, task) {
                         var new_wallet = new Wallet({
                             userId: check_referal._id,
                             type: '1',
                             money_type: 'in',
                             amount: 100,
                             others: {name: user.name},
                             date_created: new Date()
                           });
                         new_wallet.save(function(err, result) {
                           res.json({
                             error: null,
                             status: 1,
                             data: user
                           });
                         });
                       });
                     });
                   }
                 });
               }
               else{
                 res.json({
                   error: null,
                   status: 1,
                   data: user
                 });
               }
             });
           });
         }
       });
         }
         else
         {
           res.json({
                 error: null,
                 status: 5,
                 data: check
             });
         }
       });
       
      }
      else
      {
         res.json({
               error: null,
               status: 2,
               data: check
           });
      }
     });


  });

 

};


exports.updateDriver = function(req, res) {


  var upload = multer({ storage: storageForDriver }).single('file');
  upload(req,res,function(err){
   
    Driver.findOne({status: 1, phone:req.body.phone, _id: { $ne : req.body.id}}, function(err, check) {
      if(check == null)
      {
       Driver.findOne({status: 1, email:req.body.email, _id: { $ne : req.body.id}}, function(err, check1) {
         if(check1 == null)
         {

          var assocs = [];  
          for(let key of JSON.parse(req.body.associateSeller)){
            if(assocs.indexOf(key)==-1){
             assocs.push(key)
            }
          }

         var new_user = {
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          city: req.body.city,
          state: req.body.state,
          pin: req.body.pin,
          token: req.body.token,
          address:  req.body.address,
          lat: req.body.lat,
          lng: req.body.lng,
          associateSeller: assocs
        };

        if(errors.indexOf(req.file)==-1){
          new_user['image'] = req.file.filename
        }
   
       Driver.update({_id: req.body.id}, {$set: new_user},function(err, user) {
         if (user == null){
            res.send({
             error: err,
             status: 0,
             data: null
           });
         }else{
          res.json({
            error: null,
            status: 1,
            data: user
          });
         }
       });
         }
         else
         {
           res.json({
                 error: null,
                 status: 5,
                 data: check
             });
         }
       });
       
      }
      else
      {
         res.json({
               error: null,
               status: 2,
               data: check
           });
      }
     });


  });

 

};


exports.getProfile = function(req, res) {
  Users.findOne({_id : req.params.userId}, function(err, user) {
   res.json(user);
 });
};

exports.getWallet = function(req, res) {
  var obj;
  Users.findOne({_id : req.params.userId},'money', function(err, money) {
    Wallet.find({userId : req.params.userId}, function(err, wallet) {
      obj = {
        money: money.money,
        wallet: wallet
      }
      res.json(obj);
    });
  });
};

exports.walletAmount = function(req, res) {
  Users.findOne({_id : req.params.userId},'money', function(err, money) {
    res.json(money);
  });
};

exports.getAllUsers = function(req, res) {

  var counter = 0;
  var result = [];
  Users.find({status:'1'}, function(err, users) {
    if(users.length > 0)
    {
      users.forEach(function(data){
        data['password'] = decrypt(key,data.password);
        result.push(data);
        counter = counter + 1;
        if(users.length == counter)
        {
          res.json(users);
        }
      });
    }
    else
    {
      res.json(users);
    }
 });

};

exports.getAllUserNotifications = function(req, res) {
 
  Notifications.find({to: req.body.id},null, {sort : {'createdAt' : -1}}, function(err, users) {
    if(users.length > 0)
    {

      Notifications.update({to: req.body.id}, {$set:{isRead: '1'}}, {multi: true}, function(err, user){
        res.json({
          status: 1,
          data:   users
        });

      })
 
    }
    else
    {
      res.json({
        status: 0
      });
    }
 });
};

exports.getUnreadUserNotifications = function(req, res) {
 
  Notifications.count({to: req.body.id, isRead: '0' }, function(err, users) {
    res.json({
      status: 1,
      data:   users
    });
 });
};



exports.getAllCoupons = function(req, res) {
 
  Coupons.find({userId: req.body.id, status:'1'},null, {sort : {'createdAt' : -1}}, function(err, users) {
    if(users.length > 0)
    {
      res.json({
        status: 1,
        data:   users
      });
    }
    else
    {
      res.json({
        status: 0
      });
    }
 });
};

exports.addCoupon = function(req, res) {

  var data = {
    userId: req.body.id,
    name: req.body.name,
    off_upto_amount: req.body.amount,
  }

  var newCoupon = new Coupons(data);

  newCoupon.save(function(err, users) {
    if(users!=null)
    {
      res.json({
        status: 1,
        data: users
      });
    }
    else
    {
      res.json({
        status: 0
      });
    }
 });
};

exports.applyCoupon1 = function(req, res) {

  Coupons.findOne({name: req.body.name, userId: req.body.sellerId},function(err, users) {
    if(users!=null)
    {
      res.json({
        status: 1,
        data: users
      });
    }
    else
    {
      res.json({
        status: 0
      });
    }
 });
};

exports.removeThisCoupon = function(req, res) {

  Coupons.remove({_id: req.body.id},function(err, users) {
    if(users!=null)
    {
      res.json({
        status: 1,
        data: users
      });
    }
    else
    {
      res.json({
        status: 0
      });
    }
 });
};

exports.updateThisCoupon = function(req, res) {

  var data = {
    name: req.body.name,
    off_upto_amount: req.body.amount,
  }
  Coupons.update({_id: req.body.id} , {$set:data},function(err, users) {
    if(users!=null)
    {
      res.json({
        status: 1,
        data: users
      });
    }
    else
    {
      res.json({
        status: 0
      });
    }
 });
};

exports.editUser = function(req, res) {
  Users.findOne({phone:req.body.phone, _id: { $ne : req.body.id}}, function(err, check) {
   if(check == null)
   {
    Users.findOne({email:req.body.email, _id: { $ne : req.body.id}}, function(err, check1) {
      if(check1 == null)
      {
      Users.update({ _id: req.body.id }, { $set: { name: req.body.name, email: req.body.email,  phone: req.body.phone, status: req.body.status}}, {new: true}, function(err, task) {
        if (task == null){
           res.send({
            error: err,
            status: 0,
            data: null
          });
        }else{
           res.json({
              error: null,
              status: 1,
              data: task
          });
        }
      });
        }
        else
        {
          res.json({
              error: null,
              status: 5,
              data: check
          });
        }
      });
   }
   else
   {
      res.json({
          error: null,
          status: 2,
          data: check
      });
   }
 });
};

exports.changePhoneOTP = function(req, res) {
  Users.findOne({phone:req.body.phone_number, country_code:req.body.country_code, _id : {$ne : req.body.userId}}, function(err, check) {
   if(check == null)
   { 
      var otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp)
       var params = {
          'dst': req.body.country_code+req.body.phone, 
          'src' : '+919779380328', 
          'text' : "Your CrunchTime OTP is "+otp, 
          'method' : "GET" 
        };

        p.send_message(params, function (status, response) {
          var new_otp = new OTP({
              country_code: req.body.country_code,
              phone: req.body.phone_number,
              otp: otp,
              user_type: 'user'
            });

          new_otp.save(function(err, newotp) {
            res.send({
              error: null,
              status: 1,
              data: null
            });
          });
        });   
   }
   else
   {
      res.json({
        error: null,
        status: 2,
        data: check
      });
   }
  });
};

exports.changePhoneVerify = function(req, res) {
  OTP.findOne({phone:req.body.phone, country_code:req.body.country_code,user_type:'user', otp: req.body.otp}, function(err, check) {
   if(check == null)
   {
    res.send({
      error: null,
      status: 0,
      data: null
    });
   }
   else
   {
    Users.update({ _id: req.body.userId }, { $set: { country_code: req.body.country_code, phone: req.body.phone }}, {new: true}, function(err, task) {
      if (task == null){
         res.send({
          error: err,
          status: 2,
          data: null
        });
      }else{
        OTP.remove({country_code: req.body.country_code,phone: req.body.phone,otp: req.body.otp,user_type:'user'}, function(err, result) {
           res.json({
              error: null,
              status: 1,
              data: task
          });
       });
      }
    });
   }
 });
};

exports.changePassword = function(req, res) {
  Users.findOne({_id: req.body.id}, function(err, check) {
   if(check != null)
   {
      if(check.password == encrypt(key,req.body.old_password)){
        Users.update({ _id: req.body.id }, { $set: { password: encrypt(key,req.body.new_password) }}, {new: true}, function(err, task) {
          if (task == null){
             res.send({
              error: err,
              status: 0,
              data: null
            });
          }else{
             res.json({
                error: null,
                status: 1,
                data: task
            });
          }
        });
      }
      else{
        res.json({
            error: null,
            status: 2,
            data: null
        });
      }
   }
   else
   {
      res.json({
          error: null,
          status: 0,
          data: null
      });
   }
 });
};

exports.deleteUser = function(req, res) {
  Users.update({_id : req.body.id}, {$set : {status: '0'}}, function(err, task) {
     if (task == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      res.send({
        error: null,
        status: 1,
        data: task
      });
    }
    
  });
};


// start sellers controller
exports.loginSeller = function(req, res) {
  Sellers.findOne({email:req.body.email, password: encrypt(key,req.body.password)}, function(err, seller) {
     if (seller == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      // Sellers.update({ _id: seller._id }, { $set: { token: req.body.token }}, {new: true}, function(err, task) {
          res.send({
            error: null,
            status: 1,
            data: seller,
          });
      // });
    }
  });
};

exports.check_seller = function(req, res) {
  Sellers.findOne({phone:req.body.phone, country_code:req.body.country_code}, function(err, check) {
   if(check == null)
   { 
      var otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp)
       var params = {
          'dst': req.body.country_code+req.body.phone, 
          'src' : '+919779380328', 
          'text' : "Your CrunchTime OTP is "+otp, 
          'method' : "GET" 
        };

        p.send_message(params, function (status, response) {
          OTP.remove({country_code: req.body.country_code,phone: req.body.phone}, function(err, task) {
              var new_otp = new OTP({
                  country_code: req.body.country_code,
                  phone: req.body.phone,
                  otp: otp,
                  user_type: 'seller'
                });

              new_otp.save(function(err, newotp) {
                if (otp == null){
                   res.send({
                    error: err,
                    status: 0,
                    data: null
                  });
                }else{
                  res.send({
                    error: null,
                    status: 1,
                    data: null
                  });
                }
              });
            });
        });   
   }
   else
   {
      res.json({
        error: null,
        status: 2,
        data: check
      });
   }
  });
};

exports.sellerProfile = function(req, res) {
  Sellers.findOne({_id : req.params.id}, function(err, seller) {
   res.json(seller);
 });
};

exports.updateSellerInfo = function(req, res) {
  Sellers.findOne({type : 'seller', phone:req.body.phone, _id: { $ne : req.body.storeId}}, function(err, check) {
   if(check == null)
   {
    Sellers.findOne({type : 'seller', email:req.body.email, _id: { $ne : req.body.storeId}}, function(err, check1) {
      if(check1 == null)
      {
  
        Sellers.update({ _id: req.body.storeId }, { $set: { store_name: req.body.store_name, email: req.body.email, address: req.body.address,city: req.body.city,state: req.body.state,pin: req.body.pin,lat : req.body.lat,lng: req.body.lng}}, {new: true}, function(err, task) {
          if (task == null){
             res.send({
              error: err,
              status: 0,
              data: null
            });
          }else{
             res.json({
                error: null,
                status: 1,
                data: task
            });
          }
        });
    
        }
        else
        {
          res.json({
              error: null,
              status: 5,
              data: check
          });
        }
      });
   }
   else
   {
      res.json({
          error: null,
          status: 2,
          data: check
      });
   }
 });
};

exports.setTiming = function(req, res){
  Sellers.update({ _id: req.body.userId }, { $set: { timing: req.body.timing, isActive: req.body.isActive}}, {new: true}, function(err, task) {
    if (task == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
       res.json({
          error: null,
          status: 1,
          data: task
      });
    }
  });
}

exports.updateDriverInfo = function(req, res) {
  Sellers.findOne({type : 'driver', email:req.body.email, _id: { $ne : req.body.driverId}}, function(err, check) {
   if(check == null)
   {
      Sellers.update({ _id: req.body.driverId }, { $set: { driver_name: req.body.driver_name, email: req.body.email}}, {new: true}, function(err, task) {
        if (task == null){
           res.send({
            error: err,
            status: 0,
            data: null
          });
        }else{
           res.json({
              error: null,
              status: 1,
              data: task
          });
        }
      });
   }
   else
   {
      res.json({
          error: null,
          status: 2,
          data: check
      });
   }
 });
};

exports.updateSellerContact = function(req, res) {
  Sellers.findOne({phone:req.body.phone, country_code:req.body.country_code, _id: { $ne : req.body.sellerId}}, function(err, check) {
   if(check == null)
   {
    Sellers.update({ _id: req.body.sellerId }, { $set: { phone:req.body.phone, country_code:req.body.country_code}}, {new: true}, function(err, task) {
        if (task == null){
           res.send({
            error: err,
            status: 0,
            data: null
          });
        }else{
           res.json({
              error: null,
              status: 1,
              data: task
          });
        }
      });
   }
   else
   {
      res.json({
          error: null,
          status: 2,
          data: check
      });
   }
 });
};

exports.changeSellerPassword = function(req, res) {
  Sellers.findOne({_id: req.body.storeId}, function(err, check) {
   if(check != null)
   {
      if(check.password == encrypt(key,req.body.old_password)){
        Sellers.update({ _id: req.body.storeId }, { $set: { password: encrypt(key,req.body.new_password) }}, {new: true}, function(err, task) {
          if (task == null){
             res.send({
              error: err,
              status: 0,
              data: null
            });
          }else{
             res.json({
                error: null,
                status: 1,
                data: task
            });
          }
        });
      }
      else{
        res.json({
            error: null,
            status: 2,
            data: null
        });
      }
   }
   else
   {
      res.json({
          error: null,
          status: 0,
          data: null
      });
   }
 });
};

exports.create_seller = function(req, res) {
  Sellers.findOne({phone:req.body.phone}, function(err, check) {
   if(check == null)
   {
    Sellers.findOne({email:req.body.email}, function(err, check1) {
      if(check1 == null)
      {
    var timing = [
      {isOpen:true, start:'08:00', end:'22:00'},
      {isOpen:true, start:'08:00', end:'22:00'},
      {isOpen:true, start:'08:00', end:'22:00'},
      {isOpen:true, start:'08:00', end:'22:00'},
      {isOpen:true, start:'08:00', end:'22:00'},
      {isOpen:true, start:'08:00', end:'22:00'},
      {isOpen:true, start:'08:00', end:'22:00'},
    ];
    var lat = null;
    var lng = null;
    geocoder.geocode({address: req.body.address}, function(err, result) {
      if(result != null && result != undefined){
        lat = result[0].latitude; 
        lng = result[0].longitude; 
      }
        var new_seller = new Sellers({
        driver_name: null,
        store_name: req.body.store_name,
        phone: req.body.phone,
        email: req.body.email,
        country_code: req.body.country_code,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pin: req.body.pin,
        lat: req.body.lat,
        lng: req.body.lng,
        password: encrypt(key,req.body.password),
        status: 1,
        image: null,
        rating: '5',
        token: req.body.token,
        type: 'seller',
        timing: timing,
        isActive: true,
        registered_on: new Date()
      });

      new_seller.save(function(err, seller) {
        if (seller == null){
           res.send({
            error: err,
            status: 0,
            data: null
          });
        }else{
          var readStream = fs.createReadStream(path.join(__dirname, '../templates') + '/signup.html', 'utf8');
          let dynamic_content = ''
          readStream.on('data', function(chunk) {
              dynamic_content += chunk;
          }).on('end', function() {
            var helper = require('sendgrid').mail;
            var fromEmail = new helper.Email('info@CrunchTime.com','CrunchTime');
            var toEmail = new helper.Email(req.body.email);

            var subject = 'Account Registration';
            dynamic_content = dynamic_content.replace("#password#", req.body.password);
            dynamic_content = dynamic_content.replace("#username#", req.body.email);
            dynamic_content = dynamic_content.replace("#user#", req.body.store_name);
            var content = new helper.Content('text/html', dynamic_content);

            var mail = new helper.Mail(fromEmail, subject, toEmail, content);
            var sg = require('sendgrid')('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');
            var request = sg.emptyRequest({
              method: 'POST',
              path: '/v3/mail/send',
              body: mail.toJSON()
            });

            sg.API(request, function (error, response) {
              if (error) {
                res.json({
                    error: 'mail not sent.',
                    status: 1,
                    data: seller
                });
              }

              res.json({
                  error: null,
                  status: 1,
                  data: seller
              });
            });
          });
        }
      });
    });

      }
      else
      {
        res.json({
              error: null,
              status: 5,
              data: check
          });
      }
    });
   }
   else
   {
      res.json({
            error: null,
            status: 2,
            data: check
        });
   }
  });
};

exports.getSingleSeller = function(req, res) {
 
  Sellers.findOne({_id : req.body.id}, function(err, sellers) {
    res.json(sellers);
 });
};

exports.getOrderDetails = async function(req, res) {


  var orderDetails = await Orders.findOne({_id : req.body.id});

    Users.findOne({_id: orderDetails.userId}, function(err, usersinfo){

      Addresses.findOne({_id: orderDetails.address_id}, function(err, addressInfo){

        Driver.findOne({_id: orderDetails.driverId}, function(err, driverInfo){

          res.json({
            order: orderDetails,
            usersinfo: usersinfo,
            addressInfo: addressInfo,
            driverInfo: driverInfo,
            extrasInfo: orderDetails.extraStuff
          });
              
        })
      })
    })
 
};

exports.getTransactions = async function(req, res) {
 

    Transactions.find({toId: req.body.id}, function(err, TransactionsList){

      if(TransactionsList.length!=0){
        var cont = 0
        var data = []
        for(let key of TransactionsList){

          Orders.findOne({_id: key.orderId}, function(err, OrdersInfo){

            if(OrdersInfo!=null){

              Sellers.findOne({_id: OrdersInfo.sellerId}, function(err, sellerdInfo){
                Users.findOne({_id: OrdersInfo.userId}, function(err, userDetails){

                  var myamount = Number(key.amount);
  
                  data.push({
                    orderDetails: OrdersInfo,
                    userDetails: userDetails,
                    sellerdInfo: sellerdInfo,
                    myAmount: myamount.toFixed(2),
                    createdAt: key.createdAt
                  })
                  cont++;
    
                  if(cont==TransactionsList.length){
                    res.json({
                      status: 1,
                      data: arraySort(data, 'createdAt', {reverse: true}) 
                      });
                   }
                })
  
              })

            }else{

              cont++;
    
              if(cont==TransactionsList.length){
                res.json({
                  status: 1,
                  data: arraySort(data, 'createdAt', {reverse: true}) 
                  });
               }

            }



    
          })
        }


      }else{
        res.json({
          status: 0
          });
      } 
    })
 
};

exports.rateDriver = function(req, res) {
 
  Orders.update({_id : req.body.id}, {$set: {rating: req.body.rating, tip: req.body.tip, is_rated: '1'}}, function(err, order) {
    if(order!=null){
      res.json({
      status: 1
      });
    }else{
      res.json({
        status: 0
        });
    }
  
 });
};

exports.updateDriverLocation = function(req, res) {
  Driver.update({_id: req.body._id},{$set: {lat: req.body.lat, lng: req.body.lng}}, function(err, order) {
    res.json({
      status: 1
      });
  })
}

exports.updateOrderByDriver = function(req, res) {
 
  Orders.update({_id : req.body.orderId},{$set: { delivery_status: req.body.status, lat: req.body.lat,  lng: req.body.lng}}, function(err, order) {
   
    

      Orders.findOne({_id: req.body.orderId}, function(err, orderDetails){

        if(req.body.status==1){
          var handlebars = require('handlebars');
          var fs = require('fs');
            var readHTMLFile = function(path, callback) {
              fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
                  if (err) {
                      throw err;
                      callback(err);
                  }
                  else {
                      callback(null, html);
                  }
              });
          };
        var nodemailer = require('nodemailer');
        var smtpTransport = require('nodemailer-smtp-transport');
      
        var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
          user: 'noreply.crunchtime@gmail.com',
          pass: 'admin@1234'
        }
        }));
      
        readHTMLFile(__dirname + '/../templates/summary.html', function(err, html) {
          var template = handlebars.compile(html);
          var replacements = {
            "amount": orderDetails.payable_price,
            "user": req.body.userDetails.name,
            "address": orderDetails.address,
          };
  
          if(orderDetails.payment_mode=='cod'){
            replacements['mode'] = 'Cash on delivery';
          }else{
            replacements['mode'] = 'Paid online';
          }
          var htmlToSend = template(replacements);
          var mailOptions = {
            from: 'Crunch Time <noreply.crunchtime@gmail.com>',
              to: req.body.userDetails.email,
              subject: 'Order Summary',
              html : htmlToSend
           };
           transporter.sendMail(mailOptions, function (error, response) {
              if (error) {
                console.log('email eror', error)
                res.send({
                  msg: 'Internal Server Error, Try again',
                  status: 2,
                  data: null
                  });
              }else{
                // res.send({
                //   msg: 'Your account has been registered',
                //   status: 1
                //   });
              }
          });
        });
        }

        var msg;
        if(req.body.status==1){
          msg = 'Your order has been delivered';
        }
        else if(req.body.status==2){
          msg = 'Your order is being processed';
      
        }
        else if(req.body.status==3){
          msg = 'Your order is on its way';
      
        }
        else if(req.body.status==4){
          msg = 'Your order has been cancelled';
      
        }
        else if(req.body.status==5){
          msg = 'Your order has arrived';
      
        }
        else if(req.body.status==6){
          msg = 'Your order is accepted';
      
        }
        else if(req.body.status==7){
          msg = 'Your order is rejected';
      
        }
   
        Users.findOne({_id: orderDetails.userId}, function(err, userUID){
   
         fcmToBuyer(msg, userUID.token);
         firebaseNode(userUID.token, msg)
   
        })
   
       if(order!=null){
         res.json({
         status: 1
         });
       }else{
         res.json({
           status: 0
           });
         }
      })
  })
}

exports.emailTest = function(req, res) {
  var handlebars = require('handlebars');
  var fs = require('fs');
    var readHTMLFile = function(path, callback) {
      fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
          if (err) {
              throw err;
              callback(err);
          }
          else {
              callback(null, html);
          }
      });
  };
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
service: 'gmail',
auth: {
  user: 'team.centercircle@gmail.com',
  pass: 'pro@cc.com'
}
}));

readHTMLFile(__dirname + '/../templates/summary.html', function(err, html) {
  var template = handlebars.compile(html);
  var replacements = {
    "amount": '10',
    "user": 'harinder',
    "address": 'Rattangarh',
  };

  if('cod'=='cod'){
    replacements['mode'] = 'Cash on delivery';
  }else{
    replacements['mode'] = 'Paid online';
  }
  var htmlToSend = template(replacements);
  var mailOptions = {
    from: 'Center Circle <centercircleteam@gmail.com>',
      to: 'harinderorg@gmail.com',
      subject: 'Order Summary',
      html : htmlToSend
   };
   transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log('email eror', error)
        res.send({
          msg: 'Internal Server Error, Try again',
          status: 2,
          data: null
          });
      }else{
        // res.send({
        //   msg: 'Your account has been registered',
        //   status: 1
        //   });
      }
  });
});

}


exports.updateOrderLocation = function(req, res) {

  Orders.update({ _id: req.body.orderId }, { $set: {lat: req.body.lat, lng: req.body.lng}}, {new: true}, function(err, order) {
    res.send({
      status: 1
    });

  })
}
exports.updateOrder = async function(req, res) {
  var ordersDetails = await  Orders.findOne({_id : req.body.orderId})
  var sellerData = await Sellers.findOne({_id: req.body.sellerId});
  var userDetails = await Users.findOne({_id: ordersDetails.userId});

  var msg;
  if(req.body.status==1){
    msg = 'Your order has been delivered';
  }
  else if(req.body.status==2){
    msg = 'Your order is being processed';

  }
  else if(req.body.status==3){
    msg = 'Your order is on its way';

  }
  else if(req.body.status==4){
    msg = 'Your order has been cancelled';

  }
  else if(req.body.status==5){
    msg = 'Your order has arrived';

  }
  else if(req.body.status==6){
    msg = 'Your order is accepted';

  }
  else if(req.body.status==7){
    msg = 'Your order is rejected';
  }

  if(req.body.status== 4 || req.body.status == 7 || req.body.status == 6 ){
    Orders.update({_id : req.body.orderId},{$set: { delivery_status: req.body.status, driverId: '0'}}, function(err, order1) {
       
      if(order1!=null){
            res.json({
              status: 1
              });

          }else{
            res.json({
              status: 0
              });
          }
      // send fcmToBuyer

      if(req.body.status==6){
        var myId = [req.body.sellerId]
        Driver.find({status: 1, $or: [{sellerId : req.body.sellerId}, { associateSeller: {$in: myId}}]}, function(err, allDrivers) {
        for(let key1 of allDrivers){

          var msg1 = 'Seller '+sellerData.store_name+ ' has new order to deliver at ' + ordersDetails.address+ ', If you are near the seller, Please reach as soon as possible to grab the job';
          if(errors.indexOf(key1.token)==-1){
            fcmToDriver(msg1, key1.token);
            firebaseNode(key1.token, msg1)
           }
           }
        });
      }

      // send fcmToBuyer


      // to user
      if(errors.indexOf(userDetails.token)==-1){
        fcmToBuyer(msg, userDetails.token);
        firebaseNode(userDetails.token, msg)
      }


    })

  }


  if(req.body.status== 1 || req.body.status == 2 || req.body.status == 3 || req.body.status == 5 ){
    Orders.update({_id : req.body.orderId},{$set: { delivery_status: req.body.status, driverId: req.body.driverId}}, function(err, order1) {
 
      if(order1!=null){
        res.json({
          status: 1
          });

      }else{
        res.json({
          status: 0
          });
      }
      // send fcmToBuyer

   
      if(req.body.status==2){
        Driver.findOne({_id: req.body.driverId}, function(err, driverUID){
      
          var msg = 'You are assigned to a new order';

          fcmToDriver(msg, driverUID.token);
          firebaseNode(driverUID.token, msg)
         })
      }
      // send fcmToBuyer


      // to user

      if(errors.indexOf(userDetails.token)==-1){
        fcmToBuyer(msg, userDetails.token);
        firebaseNode(userDetails.token, msg)
      }

      if(req.body.status==3){

   
        Driver.findOne({_id: req.body.driverId}, function(err, driverUID){
  
          Orders.update({_id : req.body.orderId}, {$set: { lat: driverUID.lat, lng: driverUID.lng}}, function(err, order1) {
         
          })
  
  
         })
      }
   


    })


  }



 
//   Orders.findOne({_id : req.body.orderId}, function(err, order) {

//     Users.findOne({_id: order.userId}, function(err, userUID){

//       if(order.driverId==req.body.driverId && req.body.driverId!=0){
//         Orders.update({_id : req.body.orderId},{$set: { delivery_status: req.body.status}}, function(err, order1) {
//           fcmToBuyer(msg, userUID.token);
//           if(order1!=null){
//             res.json({
//             status: 1
//             });
//           }else{
//             res.json({
//               status: 0
//               });
//           }
  
  
//         })
//       }else{
  
//         Orders.update({_id : req.body.orderId},{$set: { delivery_status: req.body.status, driverId: req.body.driverId}}, function(err, order1) {
        
//          var newNotifcation = new driverNotifications({   
//           type: 1,
//           to: req.body.driverId,
//           orderId:req.body.orderId,
//         })
  
//         newNotifcation.save(function(){
//           fcmToBuyer(msg, userUID.token);
//           if(order1!=null){
           

//             if(req.body.status==2){
//               Driver.findOne({_id: req.body.driverId}, function(err, driverUID){
            
//                 var msg = 'You are assigned to a new order';
      
//                 fcmToDriver(msg, driverUID.token);
      
//                })
//             }
             
//             if(req.body.status==6){
//               var myId = [req.body.sellerId]
//               Driver.find({status: 1, $or: [{sellerId : req.body.sellerId}, { associateSeller: {$in: myId}}]}, function(err, allDrivers) {
//               for(let key1 of allDrivers){
  
//                 var msg = 'Seller '+sellerData.store_name+ ' has new order to deliver at ' + order.address+ ', If you are near the seller, Please reach as soon as possible to grab the job';
//                 if(errors.indexOf(key1.token)==-1){
//                   fcmToDriver(msg, key1.token);
//                  }
//                  }
//               });
//             }

//             res.json({
//               status: 1
//               });


//           }else{
//             res.json({
//               status: 0
//               });
//           }
//         })
//         })
//       }

//     })


  
//  });
};


exports.getSingleDriver = function(req, res) {
 
  Driver.findOne({_id : req.body.id}, function(err, sellers) {
    res.json(sellers);
 });
};

exports.getAllDrivers = function(req, res) {

  if(req.body.type==1 || req.body.type=='1'){
      Driver.find({status: 1},function(err, sellers) {
      res.json(sellers);
   });
  }else{  
     var myId = [req.body.id]
      Driver.find({status: 1, $or: [{sellerId : req.body.id}, { associateSeller: {$in: myId}}]}, function(err, sellers) {
      res.json(sellers);
  });

  }
};


exports.getAllSellers = function(req, res) {
  var counter = 0;
  var result = [];
  Sellers.find({type : 'seller', not_admin:'1', status:'1'},null, {sort : {'_id' : -1}}, function(err, sellers) {
    if(sellers.length > 0)
    {
      sellers.forEach(function(data){
        data['password'] = decrypt(key,data.password);
        result.push(data);
        counter = counter + 1;
        if(sellers.length == counter)
        {
          res.json(sellers);
        }
      });
    }
    else
    {
      res.json(sellers);
    }
 });
};

exports.getSellersByCat = async function(req, res) {

var products = await  Products.find({categories: req.body.id, status:'1'});


if(products.length!=0){

  var i = 0;
  var addSellers = [];

  for(let key of products){
     i++;
    if(addSellers.indexOf(key.storeId)==-1){
      addSellers.push(key.storeId);
    }


    if(i == products.length){

      Sellers.find({type : 'seller', not_admin:'1', _id: {$in: addSellers}}, null, {sort : {'_id' : -1}}, function(err, sellers) {
        console.log('err', err )
        console.log('sellers', sellers )
        if(sellers.length > 0)
        {
          res.json({
            status: 1,
            data: sellers
          });
        }
        else
        {
          res.json({
            status: 0
          });
        }
     });
       

    }
   

  }

}else{
  res.json({
    status: 0
  });
}

};

exports.seacrchSellers = function(req, res) {
  var counter = 0;
  var result = [];
  Sellers.find({type : 'seller', not_admin:'1', status:'1',
  $or: [
    
    { store_name: { $regex: req.body.keyword, $options: 'i' } }, 
    { address: { $regex: req.body.keyword, $options: 'i' } },
    { city: { $regex: req.body.keyword, $options: 'i' } },
    { state: { $regex: req.body.keyword, $options: 'i' } }

   ]},
  null, {sort : {'_id' : -1}}, function(err, sellers) {
    if(sellers.length > 0)
    {
      sellers.forEach(function(data){
        data['password'] = decrypt(key,data.password);
        result.push(data);
        counter = counter + 1;
        if(sellers.length == counter)
        {
          res.json(sellers);
        }
      });
    }
    else
    {
      res.json(sellers);
    }
 });
};

exports.placeOrderURL = function(req, res) {
  console.log('req.body',req.body)
  console.log('req.query',req.query)
  console.log('req.params',req.params)
}

exports.getTopSellers = function(req, res) {
  var counter = 0;
  var result = [];
  Sellers.find({status:'1', type : 'seller', not_admin:'1'},null, {sort : {'orders' : -1}}, function(err, sellers) {
    if(sellers.length > 0)
    {
      sellers.forEach(function(data){
        data['password'] = decrypt(key,data.password);
        result.push(data);
        counter = counter + 1;
        if(sellers.length == counter)
        {
          res.json(sellers);
        }
      });
    }
    else
    {
      res.json(sellers);
    }
 })
};

// exports.getAllDrivers = function(req, res) {
//   Sellers.find({type : 'driver'},null, {sort : {'_id' : -1}}, function(err, drivers) {
//       if(drivers.length > 0){
//         var counter = 0, result = [];
//         drivers.forEach(function(driver){
//           Orders.find({driverId : driver._id}, function(err, orders) {
//             var obj,driver_status;
//             if(orders.length > 0){
//               Orders.findOne({driverId : driver._id, delivery_status : '4'}, function(err, check) {
//                 if(check != null){
//                   driver_status = 'onway';
//                 }
//                 else{
//                   driver_status = 'waiting';
//                 }
//                 obj = {
//                   driver_name : driver.driver_name,
//                   _id : driver._id,
//                   driver_status : driver_status,
//                   driver_orders : orders.length
//                 }
//                 result.push(obj);
//                 counter = counter + 1;
//                 if(counter == drivers.length){
//                   res.json(result);
//                 }
//               });
//             }
//             else{
//               obj = {
//                 driver_name : driver.driver_name,
//                 _id : driver._id,
//                 driver_status : 'free',
//                 driver_orders : '0'
//               }
//               result.push(obj);
//               counter = counter + 1;
//               if(counter == drivers.length){
//                 res.json(result);
//               }
//             }
//           });
//         });
//       }
//       else{
//         res.json(drivers);
//       } 
//   });
// };

exports.deleteSeller = function(req, res) {
  Sellers.update({_id : req.body.id}, {$set : {status: '0'}}, function(err, task) {
     if (task == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      Products.remove({storeId : req.body.id}, function(err, task) {
        res.send({
          error: null,
          status: 1,
          data: task
        });
      })
 
    }
    
  });
};


exports.deleteDriver = function(req, res) {
  Driver.update({_id : req.body.id},{$set: {status: '0'}}, function(err, task) {
     if (task == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      res.send({
        error: null,
        status: 1,
        data: task
      });
    }
    
  });
};

//address controller start here
exports.add_address = function(req, res) {
  var new_address = new Address({
    name: req.body.name,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    is_default: req.body.is_default,
    phone: req.body.phone,
    userId: req.body.userId
  });

new_address.save(function(err, address) {
  if (address == null){
     res.send({
      error: err,
      status: 0,
      data: null
    });
  }else{
    res.send({
      error: null,
      status: 1,
      data: address
    });
  }
});
};

exports.getAddresses = function(req, res) {
  Address.find({userId : req.params.userId }, function(err, addresses) {
       res.json(addresses); 
  });
};

exports.getDefaultAddress = function(req, res) {
  Address.findOne({userId : req.params.userId, is_default : '1' }, function(err, address) {
       res.json(address); 
  });
};

exports.delete_address = function(req, res) {
  Address.update({_id : req.body.id}, {$set : {status: '0'}}, function(err, task) {
     if (task == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      res.send({
        error: null,
        status: 1,
        data: task
      });
    }
    
  });
};

exports.makeDefaultAddress = function(req, res) {
  Address.update({ _id: req.body.aid }, { $set: { is_default: '1' }}, {new: true}, function(err, task) {
     if (task == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      Address.update({ userId: req.body.userId, _id: {$ne : req.body.aid} }, { $set: { is_default: '0' }}, {new: true}, function(err, updated) {
          res.send({
            error: null,
            status: 1,
            data: task
          });
      });
    }
    
  });
};

//cards controller start here

exports.add_card = function(req, res) {
  var new_card = new Cards({
    card_number: req.body.card_number,
    cvv: req.body.cvv,
    expiry: req.body.expiry,
    userId: req.body.userId
  });

new_card.save(function(err, cards) {
  if (cards == null){
     res.send({
      error: err,
      status: 0,
      data: null
    });
  }else{
    res.send({
      error: null,
      status: 1,
      data: cards
    });
  }
});
};

exports.getCards = function(req, res) {
  Cards.find({userId : req.params.userId }, function(err, cards) {
       res.json(cards); 
  });
};

exports.delete_card = function(req, res) {
  Cards.remove({_id : req.body.id}, function(err, task) {
     if (task == null){ 
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      res.send({
        error: null,
        status: 1,
        data: task
      });
    }
    
  });
};

exports.addCart = async function(req, res) {
  await Cart.remove({userId : req.body.id});
  var data = {
    items: JSON.parse(req.body.products_info),
    userId: req.body.id,
    extraStuff:  req.body.extraStuff,
    orderDate: req.body.orderDate,
    orderTime: req.body.orderTime,
    orderMode:req.body.orderMode,
  }

  var newCart = new Cart(data);
  newCart.save(function(err, response){
    if(response!=null){
      res.send({
        status: 1,
        data: response
      });
    }else{
      res.send({
        status: 0
      });
    }

  });
};

exports.getPreviousOrders = function(req, res) {
 
  Orders.find({status:'1', userId: req.body._id, $or:[{delivery_status:1}, {delivery_status:4}, {delivery_status:7}]} , async function(err, user) {
     if (user.length==0){
       res.send({
          error: err,
          status: 0,
          data: null
      });
    }else{
      var dataArray =[];
      var cont = 0;
      for(let key of user){
        var itemsName = await getItemsName(key.cart_items);
        var sellerInfo = await Sellers.findOne({_id: key.sellerId});
       
        var dict = {
              address: key.address,
              cart_items: key.cart_items,
              createdAt: key.createdAt,
              delivery_status: key.delivery_status,
              driverId: key.driverId,
              payable_price: key.payable_price,
              payment_mode: key.payment_mode,
              sellerId: key.sellerId,
              updatedAt: key.updatedAt,
              userId: key.userId,
              _id: key._id,
              sellerinfo: sellerInfo!=null ? sellerInfo: null,
              items: itemsName,
              extraStuff:  key.extraStuff
        }
        dataArray.push(dict);
         cont++;
           if(cont==user.length){
             res.send({
                error: null,
                status: 1,
                data: dataArray
             });
           }
        }

     async function getItemsName(items){
        var allItems = [];
        var i = 0;
        for(let key of items){

          Products.findOne({_id: key.product_id}, function(err, productName){
           if(productName!=null){
             allItems.push(productName.name);
             i++;
              if(i==allItems.length){
                console.log('allItems', allItems)
                return allItems
              }
           }else{
            i++;
            if(i==allItems.length){
              console.log('allItems', allItems)
              return allItems
            }
           }
          });

        }

      }
  
    }
  });
};


exports.getDriverPreviousOrders = function(req, res) {
 
  Orders.find({status:'1', driverId: req.body._id, $or:[{delivery_status:1}, {delivery_status:4}]} , async function(err, user) {
     if (user.length==0){
       res.send({
          error: err,
          status: 0,
          data: null
      });
    }else{
      var dataArray =[];
      var cont = 0;
      for(let key of user){
        var itemsName = await getItemsName(key.cart_items);
        var sellerInfo = await Sellers.findOne({_id: key.sellerId});
       
        var dict = {
              address: key.address,
              cart_items: key.cart_items,
              createdAt: key.createdAt,
              delivery_status: key.delivery_status,
              driverId: key.driverId,
              payable_price: key.payable_price,
              payment_mode: key.payment_mode,
              sellerId: key.sellerId,
              updatedAt: key.updatedAt,
              userId: key.userId,
              _id: key._id,
              sellerinfo: sellerInfo!=null ? sellerInfo: null,
              items: itemsName
        }
        dataArray.push(dict);
         cont++;
           if(cont==user.length){
             res.send({
                error: null,
                status: 1,
                data: dataArray
             });
           }
        }

     async function getItemsName(items){
        var allItems = [];
        var i = 0;
        for(let key of items){

          Products.findOne({_id: key.product_id}, function(err, productName){
           if(productName!=null){
             allItems.push(productName.name);
             i++;
              if(i==allItems.length){
                console.log('allItems', allItems)
                return allItems
              }
           }else{
            i++;
            if(i==allItems.length){
              console.log('allItems', allItems)
              return allItems
            }
           }
          });

        }

      }
  
    }
  });
};

exports.getUpcomingOrders = function(req, res) {
 
  Orders.find({status:'1', userId: req.body._id, $or:[{delivery_status:2}, {delivery_status:3}, {delivery_status: 0}, {delivery_status: 5}]} , async function(err, user) {
     if (user.length==0){
       res.send({
          error: err,
          status: 0,
          data: null
      });
    }else{
      var dataArray =[];
      var cont = 0;
      for(let key of user){
        var itemsName = await getItemsName(key.cart_items);
        var sellerInfo = await Sellers.findOne({_id: key.sellerId});
       
        var dict = {
              address: key.address,
              cart_items: key.cart_items,
              createdAt: key.createdAt,
              delivery_status: key.delivery_status,
              driverId: key.driverId,
              payable_price: key.payable_price,
              payment_mode: key.payment_mode,
              sellerId: key.sellerId,
              updatedAt: key.updatedAt,
              userId: key.userId,
              _id: key._id, 
              sellerinfo: sellerInfo!=null ? sellerInfo: null,
              items: itemsName,
              extraStuff:  key.extraStuff
        }
        dataArray.push(dict);
         cont++;
           if(cont==user.length){
             res.send({
                error: null,
                status: 1,
                data: dataArray
             });
           }
        }

     async function getItemsName(items){
        var allItems = [];
        var i = 0;
        for(let key of items){

          Products.findOne({_id: key.product_id}, function(err, productName){
           if(productName!=null){
             allItems.push(productName.name);
             i++;
              if(i==allItems.length){
                console.log('allItems', allItems)
                return allItems
              }
           }else{
            i++;
            if(i==allItems.length){
              console.log('allItems', allItems)
              return allItems
            }
           }
          });

        }

      }
  
    }
  });
};



exports.logout = function(req, res) {
  if(req.body.type==0){
    Driver.update({_id: req.body._id}, {$set: {token: ''}}, function(){

      res.send({
        status: 1
     });

    })
  }else{

    Users.update({_id: req.body._id}, {$set: {token: ''}}, function(){

      res.send({
        status: 1
     });

    })
  }

};


exports.getDriverUpcomingOrders = function(req, res) {
 
  Orders.find({status:'1', driverId: req.body._id, $or:[{delivery_status:2}, {delivery_status:3}, {delivery_status: 5}]} , async function(err, user) {
     if (user.length==0){
       res.send({
          error: err,
          status: 0,
          data: null
      });
    }else{
      var dataArray =[];
      var cont = 0;
      for(let key of user){
        var itemsName = await getItemsName(key.cart_items);
        var sellerInfo = await Sellers.findOne({_id: key.sellerId});
       
        var dict = {
              address: key.address,
              cart_items: key.cart_items,
              createdAt: key.createdAt,
              delivery_status: key.delivery_status,
              driverId: key.driverId,
              payable_price: key.payable_price,
              payment_mode: key.payment_mode,
              sellerId: key.sellerId,
              updatedAt: key.updatedAt,
              userId: key.userId,
              _id: key._id,
              sellerinfo: sellerInfo!=null ? sellerInfo: null,
              items: itemsName
        }
        dataArray.push(dict);
         cont++;
           if(cont==user.length){
             res.send({
                error: null,
                status: 1,
                data: dataArray
             });
           }
        }

     async function getItemsName(items){
        var allItems = [];
        var i = 0;
        for(let key of items){

          Products.findOne({_id: key.product_id}, function(err, productName){
           if(productName!=null){
             allItems.push(productName.name);
             i++;
              if(i==allItems.length){
                console.log('allItems', allItems)
                return allItems
              }
           }else{
            i++;
            if(i==allItems.length){
              console.log('allItems', allItems)
              return allItems
            }
           }
          });

        }

      }
  
    }
  });
};

exports.getMyOrders = function(req, res) {

  var reqQuery;
  if(req.body.type==1){
    reqQuery = {status: '1'}
    query(reqQuery)
  }else{
    reqQuery = {sellerId: req.body.id, status:'1'}
    query(reqQuery)
  }

  function query(req){
    Orders.find(req, async function(err, user) {
      if (user.length==0){
        res.send({
           error: err,
           status: 0,
           data: null
       });
     }else{
       var dataArray =[];
       var cont = 0;
       for(let key of user){

        getItemsName(key.cart_items);


         var itemsName = await getItemsName(key.cart_items);
        //  var sellerInfo = await Users.findOne({_id: key.userId});

         Users.findOne({_id: key.userId}, function(err, sellerInfo){

          Driver.findOne({_id: key.driverId}, function(err, driverInfo){

                Sellers.findOne({_id: key.sellerId}, function(err, StoreInfo){

                  var dict = {
                    address: key.address,
                    cart_items: key.cart_items,
                    createdAt: key.createdAt,
                    delivery_status: key.delivery_status,
                    driverId: key.driverId,
                    payable_price: key.payable_price,
                    payment_mode: key.payment_mode,
                    sellerId: key.sellerId,
                    updatedAt: key.updatedAt,
                    userId: key.userId,
                    _id: key._id,
                    sellerinfo: sellerInfo!=null ? sellerInfo: null,
                    items: itemsName,
                    driverInfo: driverInfo,
                    StoreInfo: StoreInfo,
                    rating: key.rating,
                    tip: key.tip,
                    orderDate: key.orderDate,
                    orderTime: convert24To12(key.orderTime),
                    orderMode: key.orderMode,
              }

             function convert24To12(time){
                    var h = time.split(':')[0]
                    var m = time.split(':')[1]
                    var hours = h;
                    var AmOrPm = hours >= 12 ? 'pm' : 'am';
                    hours = (hours % 12) || 12;
                    var minutes = m;
                    var finalTime = "Time  - " + hours + ":" + minutes + " " + AmOrPm; 
                    return finalTime  
              }
              
              dataArray.push(dict);
               cont++;
                 if(cont==user.length){
                   res.send({
                      error: null,
                      status: 1,
                      data: arraySort(dataArray, 'createdAt', {reverse: true}) 
                   });
                 }

                 
                })
  
          })

         })
        
      
         }
 
      async function getItemsName(items){
         var allItems = [];
         var i = 0;
         for(let key of items){
 
           Products.findOne({_id: key.product_id}, function(err, productName){
            if(productName!=null){
              allItems.push(productName.name);
              i++;
               if(i==allItems.length){
                 console.log('allItems', allItems)
                 return allItems
               }
            }else{
             i++;
             if(i==allItems.length){
               console.log('allItems', allItems)
               return allItems
             }
            }
           });
 
         }
 
       }
   
     }
   });
  }

};


exports.filterOrders = function(req, res) {

 console.log(req.body.filters)

 var similar = [];
 if(errors.indexOf(req.body.filters.preOrderDate)==-1){

  similar.push({ "orderDate": { '$regex': String(req.body.filters.preOrderDate), $options: 'i' } })

 }

 if(errors.indexOf(req.body.filters.preOrderTime)==-1){
  similar.push({ "orderTime": { '$regex': String(req.body.filters.preOrderTime), $options: 'i' } })
}

if(errors.indexOf(req.body.filters.address)==-1){
  similar.push({ "address": { '$regex': String(req.body.filters.address), $options: 'i' } })
}
 

  var filter = {


  }

  if(similar.length!=0){
    filter['$or'] = similar
  }

  if(errors.indexOf(req.body.filters.orderNumber)==-1){
    if(req.body.filters.orderNumber.match(/^[0-9a-fA-F]{24}$/)){
      var orderIDD = String(req.body.filters.orderNumber);
      filter['_id']  = orderIDD.trim()
    }else{
      filter['_id']  = '41224d776a326fb40f000001'
      
    }
    
  }

  if(errors.indexOf(req.body.filters.rating)==-1){
    filter['rating']  = req.body.filters.rating
  }

  if(errors.indexOf(req.body.filters.tip)==-1){
    filter['tip']  = req.body.filters.tip
  }

  if(errors.indexOf(req.body.filters.pm)==-1 && req.body.filters.pm!= 'pm'){
    filter['payment_mode']  = req.body.filters.pm
  }

  if(errors.indexOf(req.body.filters.amount)==-1){
    filter['payable_price']  = req.body.filters.amount
  }

  if(errors.indexOf(req.body.filters.status)==-1 && req.body.filters.status!='status'){
    filter['delivery_status']  = req.body.filters.status
  }

  if(errors.indexOf(req.body.filters.orderMode)==-1 && req.body.filters.orderMode!='orderMode'){  
    filter['orderMode']  = req.body.filters.orderMode
  }

  if(errors.indexOf(req.body.filters.driver)==-1 && req.body.filters.driver!='Driver'){
    filter['driverId']  = req.body.filters.driver == '0' ? '0' : { $ne: '0'}
  }

  var reqQuery;
  if(req.body.type==1){

    if(errors.indexOf(req.body.filters.storeName)==-1 && req.body.filters.storeName!= 'storeName'){
      filter['sellerId'] = req.body.filters.storeName;
    }

    console.log('query', filter)

    reqQuery = filter
    query(reqQuery)
  }else{
    console.log('query', filter)
    reqQuery = filter
 
    query(reqQuery)
  }

  function query(req){
    Orders.find(req, async function(err, user) {

     console.log('find the error', err)

      if (user.length==0){
        res.send({
           error: err,
           status: 0,
           data: null
       });
     }else{
       var dataArray =[];
       var cont = 0;
       for(let key of user){

        getItemsName(key.cart_items);


         var itemsName = await getItemsName(key.cart_items);
        //  var sellerInfo = await Users.findOne({_id: key.userId});

         Users.findOne({_id: key.userId}, function(err, sellerInfo){

          Driver.findOne({_id: key.driverId}, function(err, driverInfo){

                Sellers.findOne({_id: key.sellerId}, function(err, StoreInfo){

                  var dict = {
                    address: key.address,
                    cart_items: key.cart_items,
                    createdAt: key.createdAt,
                    delivery_status: key.delivery_status,
                    driverId: key.driverId,
                    payable_price: key.payable_price,
                    payment_mode: key.payment_mode,
                    sellerId: key.sellerId,
                    updatedAt: key.updatedAt,
                    userId: key.userId,
                    _id: key._id,
                    sellerinfo: sellerInfo!=null ? sellerInfo: null,
                    items: itemsName,
                    driverInfo: driverInfo,
                    StoreInfo: StoreInfo,
                    rating: key.rating,
                    tip: key.tip,
                    orderDate: key.orderDate,
                    orderTime: convert24To12(key.orderTime),
                    orderMode: key.orderMode,
              }

             function convert24To12(time){
                    var h = time.split(':')[0]
                    var m = time.split(':')[1]
                    var hours = h;
                    var AmOrPm = hours >= 12 ? 'pm' : 'am';
                    hours = (hours % 12) || 12;
                    var minutes = m;
                    var finalTime = "Time  - " + hours + ":" + minutes + " " + AmOrPm; 
                    return finalTime  
              }
              
              dataArray.push(dict);
               cont++;
                 if(cont==user.length){
                   res.send({
                      error: null,
                      status: 1,
                      data: arraySort(dataArray, 'createdAt', {reverse: true}) 
                   });
                 }

                 
                })
  
          })

         })
        
      
         }
 
      async function getItemsName(items){
         var allItems = [];
         var i = 0;
         for(let key of items){
 
           Products.findOne({_id: key.product_id}, function(err, productName){
            if(productName!=null){
              allItems.push(productName.name);
              i++;
               if(i==allItems.length){
                 console.log('allItems', allItems)
                 return allItems
               }
            }else{
             i++;
             if(i==allItems.length){
               console.log('allItems', allItems)
               return allItems
             }
            }
           });
 
         }
 
       }
   
     }
   });
  }

};

// authorize net payment gateway
exports.PayAuth = function(req, res) {
  var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName('2bGU8e9d7Ar');
  merchantAuthenticationType.setTransactionKey('67Bj747L8TbcM4Sg');

  var creditCard = new ApiContracts.CreditCardType();
  creditCard.setCardNumber(req.body.card_number);
  creditCard.setExpirationDate(req.body.expiry_month+req.body.expiry_year);
  creditCard.setCardCode(req.body.cvv);

  var paymentType = new ApiContracts.PaymentType();
  paymentType.setCreditCard(creditCard);

  var orderDetails = new ApiContracts.OrderType();
  //orderDetails.setInvoiceNumber('INV-12345');
  orderDetails.setDescription('CrunchTime Order Payment');

  // var tax = new ApiContracts.ExtendedAmountType();
  // tax.setAmount('4.26');
  // tax.setName('level2 tax name');
  // tax.setDescription('level2 tax');

  // var duty = new ApiContracts.ExtendedAmountType();
  // duty.setAmount('8.55');
  // duty.setName('duty name');
  // duty.setDescription('duty description');

  // var shipping = new ApiContracts.ExtendedAmountType();
  // shipping.setAmount('8.55');
  // shipping.setName('shipping name');
  // shipping.setDescription('shipping description');

  var billTo = new ApiContracts.CustomerAddressType();
  billTo.setFirstName(req.body.name);
  // billTo.setLastName('Johnson');
  //billTo.setCompany('Souveniropolis');
  billTo.setAddress(req.body.address);
  // billTo.setCity('Pecan Springs');
  // billTo.setState('TX');
  billTo.setZip(req.body.zip);
  //billTo.setCountry('USA'); 

  // var shipTo = new ApiContracts.CustomerAddressType();
  // shipTo.setFirstName('China');
  // shipTo.setLastName('Bayles');
  // shipTo.setCompany('Thyme for Tea');
  // shipTo.setAddress('12 Main Street');
  // shipTo.setCity('Pecan Springs');
  // shipTo.setState('TX');
  // shipTo.setZip('44628');
  // shipTo.setCountry('USA');

  // var lineItem_id1 = new ApiContracts.LineItemType();
  // lineItem_id1.setItemId('1');
  // lineItem_id1.setName('vase');
  // lineItem_id1.setDescription('cannes logo');
  // lineItem_id1.setQuantity('1');
  // lineItem_id1.setUnitPrice('60.00');

  // var lineItem_id2 = new ApiContracts.LineItemType();
  // lineItem_id2.setItemId('2');
  // lineItem_id2.setName('vase2');
  // lineItem_id2.setDescription('cannes logo2');
  // lineItem_id2.setQuantity('1');
  // lineItem_id2.setUnitPrice('20.00');

  // var lineItemList = [];
  // lineItemList.push(lineItem_id1);
  // lineItemList.push(lineItem_id2);

  // var lineItems = new ApiContracts.ArrayOfLineItem();
  // lineItems.setLineItem(lineItemList);

  // var userField_a = new ApiContracts.UserField();
  // userField_a.setName('A');
  // userField_a.setValue('Aval');

  // var userField_b = new ApiContracts.UserField();
  // userField_b.setName('B');
  // userField_b.setValue('Bval');

  // var userFieldList = [];
  // userFieldList.push(userField_a);
  // userFieldList.push(userField_b);

  // var userFields = new ApiContracts.TransactionRequestType.UserFields();
  // userFields.setUserField(userFieldList);

  // var transactionSetting1 = new ApiContracts.SettingType();
  // transactionSetting1.setSettingName('testRequest');
  // transactionSetting1.setSettingValue('s1val');

  // var transactionSetting2 = new ApiContracts.SettingType();
  // transactionSetting2.setSettingName('testRequest');
  // transactionSetting2.setSettingValue('s2val');

  // var transactionSettingList = [];
  // transactionSettingList.push(transactionSetting1);
  // transactionSettingList.push(transactionSetting2);

  // var transactionSettings = new ApiContracts.ArrayOfSetting();
  // transactionSettings.setSetting(transactionSettingList);

  var transactionRequestType = new ApiContracts.TransactionRequestType();
  transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHONLYTRANSACTION);
  transactionRequestType.setPayment(paymentType);
  transactionRequestType.setAmount(req.body.order_price);
  // transactionRequestType.setLineItems(lineItems);
  // transactionRequestType.setUserFields(userFields);
  transactionRequestType.setOrder(orderDetails);
  // transactionRequestType.setTax(tax);
  // transactionRequestType.setDuty(duty);
  // transactionRequestType.setShipping(shipping);
  transactionRequestType.setBillTo(billTo);
  // transactionRequestType.setShipTo(shipTo);
  // transactionRequestType.setTransactionSettings(transactionSettings);

  var createRequest = new ApiContracts.CreateTransactionRequest();
  createRequest.setMerchantAuthentication(merchantAuthenticationType);
  createRequest.setTransactionRequest(transactionRequestType);
    
  var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

  ctrl.execute(function(){

    var apiResponse = ctrl.getResponse();

    var response = new ApiContracts.CreateTransactionResponse(apiResponse);

    if(response != null){
      if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
        if(response.getTransactionResponse().getMessages() != null){
          if(req.body.save_card == true){
            var new_card = new Cards({
              card_number: req.body.card_number,
              cvv: req.body.cvv,
              zip: req.body.zip,
              expiry: req.body.expiry_year+'-'+req.body.expiry_month,
              userId: req.body.userId
            });
            new_card.save();
          }

          res.json({
              error: null,
              status: 1,
              data: {
                responseCode: response.getTransactionResponse().getResponseCode(),
                transactionId: response.getTransactionResponse().getTransId(),
                messageCode: response.getTransactionResponse().getMessages().getMessage()[0].getCode(),
                description: response.getTransactionResponse().getMessages().getMessage()[0].getDescription()
              }
            });
        }
        else {
          // //console.log('Failed Transaction.');
          if(response.getTransactionResponse().getErrors() != null){

            res.json({
              error: {
                errorCode: response.getTransactionResponse().getErrors().getError()[0].getErrorCode(),
                errorMessage: response.getTransactionResponse().getErrors().getError()[0].getErrorText()
              },
              status: 0,
              data: null
            });
          }
        }
      }
      else {
        // //console.log('Failed Transaction.');
        if(response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null){
        
            res.send({
              error: {
                errorCode: response.getTransactionResponse().getErrors().getError()[0].getErrorCode(),
                errorMessage: response.getTransactionResponse().getErrors().getError()[0].getErrorText()
              },
              status: 0,
              data: null
            });
        }
        else {

          res.json({
              error: {
                errorCode: response.getMessages().getMessage()[0].getCode(),
                errorMessage: response.getMessages().getMessage()[0].getText()
              },
              status: 0,
              data: null
            });
        }
      }
    }
    else {
      res.json({
          error: {
            errorCode: '0',
            errorMessage: 'Null Response from payment gateway.'
          },
          status: 0,
          data: null
        });
    }
  });
}

function encrypt(key, data) {
  var cipher = crypto.createCipher('aes-256-cbc', key);
  var crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(key, data) {
  var decipher = crypto.createDecipher('aes-256-cbc', key);
  var decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

function randomString(length) {
    var chars = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ'
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

// start admin controller
exports.test = function(req, res) {
console.log('yesss');
};


function addNotification(data){
  var newNotifcation = new Notifications(data);

  newNotifcation.save(function(){

  })

}




async function fcmToDriver(msg, uid)  {
 
  const OneSignal = require('onesignal-node');    
  
  const client = new OneSignal.Client('0be4605b-6a28-4fd2-961c-c45cdeed0d37', 'ZDQ0Zjk4YmYtNjk3MS00YjZjLTk2NGItOWEyNjYyZDk5OGQx');
  
  const notification = {
  
    contents: {
      'tr': 'Yeni bildirim',
      'en': msg,
      'sound': 'police',
      "android_sound": "police",
    },
    icon:'screen',
    "android_sound": "police",
     sound: 'police',
     android_channel_id: '546e2bd4-aa12-49ee-8c8e-a8afe4be4476',
     channel_id: '546e2bd4-aa12-49ee-8c8e-a8afe4be4476',
     include_android_reg_ids: [uid]
  
  };
   
  
  try {
    const response = await client.createNotification(notification);
    console.log(response.body.id);
  } catch (e) {
    if (e instanceof OneSignal.HTTPError) {
     
      console.log(e.statusCode);
      console.log(e.body);
    }
  }
  }

  async function fcmToBuyer(msg, uid) {
 
    const OneSignal = require('onesignal-node');    
    
    const client = new OneSignal.Client('50ced7a2-22ee-4b16-943b-bd8520a8f07d', 'MzMwNjBjNTEtZjcyNC00ZTk5LWEzNzctNDZiZjI3NmE5MGZj');
    
    const notification = {
  
      contents: {
        'tr': 'Yeni bildirim',
        'en': msg,
        'sound': 'police',
        "android_sound": "police",
      },
      icon:'screen',
      "android_sound": "police",
       sound: 'police',
       android_channel_id: '7668d247-36f9-4a24-b926-74b9888133be',
       channel_id: '7668d247-36f9-4a24-b926-74b9888133be',
       include_android_reg_ids: [uid]
    
    };
     
    
    try {
      const response = await client.createNotification(notification);
      console.log(response.body.id);
    } catch (e) {
      if (e instanceof OneSignal.HTTPError) {
       
        console.log(e.statusCode);
        console.log(e.body);
      }
    }
    }



    function firebaseNode(to, body){
      var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: to, 
        collapse_key: 'your_collapse_key',
        
        notification: {
            title: 'New notification from CrunchTime', 
            body: body ,
            "sound": "default"
        }, "priority": "high",
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
    }