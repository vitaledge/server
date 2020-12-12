'use strict';

var mongoose = require('mongoose'),
errors = ['', null, undefined],
Orders = mongoose.model('Orders'),
Users = mongoose.model('Users'),
Products = mongoose.model('Products'),
Extras = mongoose.model('Extras'),
Sellers = mongoose.model('Sellers'),
Coupons = mongoose.model('Coupons'),
Banners = mongoose.model('Banners'),
Categories = mongoose.model('Categories'),
multer  = require('multer'),
Wallet = mongoose.model('Wallet'),
// arraySort = require('array-sort'),
sortBy = require('sort-by'),
FCM = require('fcm-node');

var serverKey = 'AAAAWFsdc2M:APA91bFVhRA7pN89Ql1pAFN292ZCeXuBf-afMBM799rLb5KzRprUMY5fb1f9LmSwLqHD7Wp-SNM7fMeE5yhZRtoEeXN-nOHzNR-JBLijSRJk1KELshkVP0WMPrpQS5uonyuu91eU68RdxddI5Br5nK6h_H1VgQP81Q';
var fcm = new FCM(serverKey);
var multer  = require('multer');

var storageForProducts = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'data/products/')
  },
  filename: function(req, file, cb) {
       var fileExtn = file.originalname.split('.').pop(-1);
      cb(null, new Date().getTime() + '.' + fileExtn);
      }
});

var storageForExtras = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'data/extras/')
  },
  filename: function(req, file, cb) {
       var fileExtn = file.originalname.split('.').pop(-1);
      cb(null, new Date().getTime() + '.' + fileExtn);
      }
});

var FCM = require('fcm-node');
var serverKey = 'AAAAt5ic2Zg:APA91bFoRielfJLbdanKIbxFbHjlPyMpubO_wNN2QsNz__HSf6n6qCF8vOB6QA8aUa_SvnZqVjUVarDI9XRQ4gf1W2S-WjpmFjRz9_-p8c1TvV2YyDHpz5Y9svQe1P5cs0dAHaM2D_Fp'; //put your server key here
var fcm = new FCM(serverKey);

// start products controller
exports.add_product = function(req, res) {
 
      var upload = multer({ storage:storageForProducts }).single('file');
      upload(req,res,function(err){
        var data = req.body;
        var new_product = new Products({
          name: data.name,
          price: data.price,
          discount: data.discount,
          discount_type: data.discount_type,
          quantity: data.quantity,
          quantity_type: data.quantity_type,
          category: data.category,
          in_stock: data.in_stock,
          storeId: data.storeId,
          image: req.file.filename,
          categories: data.categories,
          description: data.description,
          status: '1'
        });

        new_product.save(function(err, product) {
          if (product == null){
             res.send({
              error: err,
              status: 0,
              data: null
            });
          }else{
            res.send({
              error: null,
              status: 1,
              data: product
            });
          }
        });
      });
 
};

// start products controller
exports.add_extras = function(req, res) {
 
  var upload = multer({ storage:storageForExtras }).single('file');
  upload(req,res,function(err){
    var data = req.body;

    var new_product = new Extras({
      name: data.name,
      description: data.description,
      price: data.price,
      sellerId: data.sellerId,
      image: req.file.filename
    });

    new_product.save(function(err, product) {
      if (product == null){
         res.send({
          error: err,
          status: 0,
          data: null
        });
      }else{
        res.send({
          error: null,
          status: 1,
          data: product
        });
      }
    });
  });

};

exports.edit_extras = function(req, res) {
  
  var upload = multer({ storage:storageForExtras }).single('file');

  upload(req,res,function(err){
    
    var data = { 
      name:  req.body.name,
      price:  req.body.price,
      description:  req.body.description,
    }
    if(errors.indexOf(req.file)==-1){
      data['image'] = req.file.filename;
      }


      Extras.update({ _id: req.body.ExtrasId }, { $set: data }, {new: true}, function(err, product) {
      if (product == null){
         res.send({
          error: err,
          status: 0,
          data: null
        });
      }else{
        res.send({
          error: null,
          status: 1,
          data: product
        });
      }
    });
  });

};


exports.edit_product = function(req, res) {
  
      var upload = multer({ storage:storageForProducts }).single('file');

      upload(req,res,function(err){
        var data = { 
          name: req.body.name,
          price: req.body.price,
          discount: req.body.discount,
          discount_type: req.body.discount_type,
          quantity: req.body.quantity,
          quantity_type: req.body.quantity_type,
          category: req.body.category,
          in_stock: req.body.in_stock,
          categories: req.body.categories,
          description: req.body.description
        }
        if(errors.indexOf(req.file)==-1){
          data['image'] = req.file.filename;
          }


        Products.update({ _id: req.body.productId }, { $set: data }, {new: true}, function(err, product) {
          if (product == null){
             res.send({
              error: err,
              status: 0,
              data: null
            });
          }else{
            res.send({
              error: null,
              status: 1,
              data: product
            });
          }
        });
      });
 
};

// exports.add_products = function(req, res) {
//     Products.findOne({name : req.body.name, storeId: req.body.storeId }, function(err, check) {
//       if(check == null){
//       var new_product = new Products({
//         name: req.body.name,
//         price: req.body.price,
//         discount: req.body.discount,
//         discount_type: req.body.discount_type,
//         quantity: req.body.quantity,
//         quantity_type: req.body.quantity_type,
//         category: req.body.category,
//         in_stock: req.body.in_stock,
//         storeId: req.body.storeId
//       });

//       new_product.save(function(err, product) {
//         if (product == null){
//            res.send({
//             error: err,
//             status: 0,
//             data: null
//           });
//         }else{
//           res.send({
//             error: null,
//             status: 1,
//             data: product
//           });
//         }
//       });
//     }
//     else{
//         res.send({
//           error: null,
//           status: 2,
//           data: check
//         });
//       }
//     });
// };

exports.editProducts = function(req, res) {
  Products.findOne({name : req.body.name, storeId: req.body.storeId, _id: {$ne : req.body.productId } }, function(err, check) {
    if(check == null){
      Products.update({ _id: req.body.productId }, { $set: { 
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        discount_type: req.body.discount_type,
        quantity: req.body.quantity,
        quantity_type: req.body.quantity_type,
        category: req.body.category,
        in_stock: req.body.in_stock
      }}, {new: true}, function(err, task) {
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
          data: check
      });
    }
  });
};

exports.getProducts = function(req, res) {
  var conditions = {}
  if(req.params.type != '2' && req.params.type != '3')
  {
    conditions = {category : req.params.type, status: '1'}
  }
  else 
  {
    conditions = {storeId : req.params.storeId, status: '1'}
  }
  Products.find(conditions,null,{sort : {_id : -1}}, function(err, products) {
       res.json(products); 
  });
};

 


exports.getSingleProduct = function(req, res) {

  Products.findOne({_id: req.body._id, status:'1'}, function(err, products) {
   if(products!=null){
    res.json({
      status:1,
      data: products
    }); 
   }else{
    res.json({
      status:0,
      data: []
    });
   }
});
};


exports.getSingleExtras = function(req, res) {

  Extras.findOne({_id: req.body._id, status:'1'}, function(err, products) {
   if(products!=null){
    res.json({
      status:1,
      data: products
    }); 
   }else{
    res.json({
      status:0,
      data: []
    });
   }
});
};

exports.getProductsByCat = async function(req, res) {
  var products = await Products.find({categories : req.body.catId, storeId: req.body.store_id, status:'1'});
     if(products.length!=0){
  
         var data = [];
         var i  = 0;
         for(let key of products){
       
             Sellers.findOne({_id : key.storeId}, function(err, seller){
                    if(seller!=null){  
                      var dist = {
                          _id: key._id,
                          store_id : key.storeId,
                          store_name : seller.store_name,
                          email : seller.email,
                          name: key.name,
                          price :  key.price,
                          discount:  key.discount,
                          discount_type :  key.discount_type,
                          quantity:  key.quantity,
                          quantity_type:  key.quantity_type,
                          category :  key.category,
                          in_stock :  key.in_stock,
                          image :  key.image,
                          description: key.description
                      }
  
                      data.push(dist);
                      i++;
  
                      if(i==products.length){
                                res.json({
                                    error: null,
                                    status: 1,
                                    data: data
                                });
                      }
  
                    }else{
  
                            i++;
  
                            if(i==products.length){
                                    res.json({
                                        error: null,
                                        status: 1,
                                        data: data
                                    });
                            }
  
   
                     }
  
  
             });
  
       
  
  
  
  
         }
  }else{
            res.send({
              status: 0,
              data: null
            });
  
  }
  
  };


exports.getAllProducts = async function(req, res) {


if(req.body.type==1){
var products = await Products.find({status: '1'});
 get_products()
}else{
var products = await Products.find({status: '1', storeId : req.body._id});
 get_products()
}


 function get_products(){
   if(products.length!=0){

       var data = [];
       var i  = 0;
       for(let key of products){
     
           Sellers.findOne({_id : key.storeId}, function(err, seller){
                  if(seller!=null){  
                    var dist = {
                        _id: key._id,
                        store_id : key.storeId,
                        store_name : seller.store_name,
                        email : seller.email,
                        name: key.name,
                        price :  key.price,
                        discount:  key.discount,
                        discount_type :  key.discount_type,
                        quantity:  key.quantity,
                        quantity_type:  key.quantity_type,
                        category :  key.category,
                        in_stock :  key.in_stock,
                        image :  key.image,
                        description :  key.description,
                    }

                    data.push(dist);
                    i++;

                    if(i==products.length){
                              res.json({
                                  error: null,
                                  status: 1,
                                  data: data
                              });
                    }

                  }else{

                          i++;

                          if(i==products.length){
                                  res.json({
                                      error: null,
                                      status: 1,
                                      data: data
                                  });
                          }
                   }
           });
       }
}else{
          res.send({
            status: 0,
            data: null
          });

}
 }


};


exports.getAllExtras = async function(req, res) {

  if(req.body.type==1){
  var products = await Extras.find({status: '1'});
   get_products()
  }else{
  var products = await Extras.find({status: '1', sellerId : req.body._id});
   get_products()
  }
  
  
   function get_products(){
     if(products.length!=0){
  
         var data = [];
         var i  = 0;
         for(let key of products){
       
             Sellers.findOne({_id : key.sellerId}, function(err, seller){
                    if(seller!=null){  
                      var dist = {
                          _id: key._id,
                          store_id : key.sellerId,
                          store_name : seller.store_name,
                          email : seller.email,
                          name: key.name,
                          price :  key.price,
                          discount:  key.discount,
                          discount_type :  key.discount_type,
                          quantity:  key.quantity,
                          quantity_type:  key.quantity_type,
                          category :  key.category,
                          in_stock :  key.in_stock,
                          image :  key.image,
                          description :  key.description,
                      }
  
                      data.push(dist);
                      i++;
  
                      if(i==products.length){
                                res.json({
                                    error: null,
                                    status: 1,
                                    data: data
                                });
                      }
  
                    }else{
  
                            i++;
  
                            if(i==products.length){
                                    res.json({
                                        error: null,
                                        status: 1,
                                        data: data
                                    });
                            }
                     }
             });
         }
  }else{
            res.send({
              status: 0,
              data: null
            });
  
  }
   }
  
  
  };




exports.getCartItems = function(req, res) {
  var ids = JSON.parse(req.body.productIds)
  Products.find({_id : {$in : ids}}, function(err, products) {
       res.json(products); 
  });
};

exports.applyCoupon = function(req, res) {
  var current_date = new Date();
  var current_date = current_date.getFullYear()+"-"+("0"+(current_date.getMonth()+1)).slice(-2)+"-"+("0"+current_date.getDate()).slice(-2);
  var arr = [];
  // arr.push(req.body.userId);
  Coupons.findOne({name: req.body.coupon_code, status: 1}, function(err, is_coupon) {
       if(is_coupon != null){
          if(is_coupon.expiry_date < current_date){
            res.send({
              error: null,
              status: 2,
              data: null
            });
          }
          else{
            res.send({
                      error: null,
                      status: 1,
                      data: is_coupon
                    });

            // Orders.count({userId : req.body.userId, coupon: req.body.coupon_code}, function(err, applied_count) {
            //     if(applied_count == is_coupon.how_many_times){
            //       res.send({
            //         error: null,
            //         status: 3,
            //         data: is_coupon.how_many_times
            //       });
            //     }
            //     else{
            //       res.send({
            //         error: null,
            //         status: 1,
            //         data: is_coupon
            //       });
            //     }
            // });
          }
       }
       else{
        res.send({
          error: null,
          status: 0
        });
       }
  });
};

exports.add_coupon = function(req, res) {
  var new_coupon = new Coupons({
    name:req.body.coupon_code,
    userId: req.body.userIds,
    expiry_date: req.body.expiry_date,
    minimum_value: req.body.minimum_value,
    off_upto_amount: req.body.off_upto_amount,
    off_type: req.body.off_type,
    how_many_times: req.body.how_many_times
  });

  new_coupon.save(function(err, coupon) {
    if (coupon == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      res.send({
        error: null,
        status: 1,
        data: coupon
      });
    }
  });
};

exports.getTodayDeals = function(req, res) {
  Products.find({discount : {$ne : 'null'}}, function(err, products) {
       res.json(products); 
  });
};

exports.sliders = function(req, res) {
  Banners.find({},null,{sort: {'position': 1}}, function(err, banners) {
       res.json(banners); 
  });
};

exports.categories = function(req, res) {
  Categories.find({status:'1'},null,{sort: {'position': 1}}, function(err, categories) {
       res.json(categories); 
  });
};

exports.delete_products = function(req, res) {
  Products.update({_id : req.body.id}, {$set : {status: '0'}}, function(err, task) {
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

exports.delete_extras = function(req, res) {
  Extras.update({_id : req.body.id}, {$set : {status: '0'}}, function(err, task) {
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

// start order controller
exports.add_order = function(req, res) {
  var new_order = new Orders({
    orderId: randomString(8),
    userId: req.body.userId,
    sellerId: req.body.sellerId,
    payment_mode: req.body.payment_mode,
    payable_price: Number(req.body.total_payable_price),
    cart_items: req.body.final_cart,
    address: req.body.address,
    user_status: 0,
    delivery_status: 0,
    driverId: null,
    coupon: req.body.coupon,
    order_date: new Date()
  });

  new_order.save(function(err, order) {
    if (order == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      if(req.body.wallet_used != 0 && req.body.wallet_used > 0){
        var new_wallet = new Wallet({
          userId: req.body.userId,
          type: '2',
          money_type: 'out',
          amount: req.body.wallet_used,
          others: {orderId: order.orderId},
          date_created: new Date()
        });
        new_wallet.save();
        var money = req.body.wallet_amount - req.body.wallet_used;
        Users.update({ _id: req.body.userId }, { $set: {money : money}}, {new: true}, function(err, updated) {
        });
      }
      Sellers.findOne({_id : req.body.sellerId}, function(err, seller_info) {
        if(seller_info != null){
          if(seller_info.token != null && seller_info.token != '' && seller_info.token != undefined){
            var notis_body = 'You have new booking order ('+order.orderId+').';
              pushNotification(seller_info.token,'New Order Booked',notis_body,order._id);
              res.send({
                error: null,
                status: 1,
                data: order
              });
          }
          else{
            res.send({
              error: null,
              status: 1,
              data: order
            });
          }
        }
        else{
          res.send({
            error: null,
            status: 1,
            data: order
          });
        }
      });
    }
  });
};

function randomString(len, charSet) {
    charSet = charSet || '0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

exports.getUserOrders = function(req, res) {
  var conditions = {}
  if(req.body.status == '1')
  {
    conditions = {status:'1', userId : req.body.userId, delivery_status : '1'}
  }
  else
  {
    conditions = {status:'1', userId : req.body.userId, delivery_status : { $ne : '1'}}
  }
  Orders.find(conditions, null, {sort: {'_id': -1}}, function(err, orders) {
       res.json(orders); 
  });
};

exports.getStoreOrders = function(req, res) {
  var counter = 0;
  var all_orders = [];
  var user_name = '',user_phone = '';
  Orders.find({status:'1'}, null, {sort: {'_id': -1}}, function(err, orders) {
    if(orders.length > 0){
      orders.forEach(function(data){
        Users.findOne({_id : data.userId}, function(err, user) {
          if(user != null){
            user_name = user.name;
            user_phone = user.phone;
          }
          var obj = {
            user_name : user_name,
            user_phone : user_phone,
            orderId: data.orderId,
            userId: data.userId,
            sellerId: data.sellerId,
            payment_mode: data.payment_mode,
            payable_price: data.payable_price,
            cart_items: data.cart_items,
            address: data.address,
            user_status: data.user_status,
            delivery_status: data.delivery_status,
            delivery_time: data.delivery_time,
            order_date: data.order_date
          }
          all_orders.push(obj);
          counter = counter + 1;
          if(counter == orders.length){
            res.json(all_orders); 
          }
        });
      });
    }
    else{
      res.json(orders); 
    }
  });
};

exports.getSellerOrders = function(req, res) {
  var conditions = {}
  if(req.body.user_type == 'driver'){
    if(req.body.status == '1')
    {
      conditions = {status:'1', driverId : req.body.storeId, $or : [{delivery_status : '1'},{delivery_status : '3'}]}
    }
    else
    {
      conditions = {status:'1', driverId : req.body.storeId, $or : [{delivery_status : '0'},{delivery_status : '2'},{delivery_status : '4'}]}
    }
  }
  else{
    if(req.body.status == '1')
    {
      conditions = {status:'1', sellerId : req.body.storeId, $or : [{delivery_status : '1'},{delivery_status : '3'}]}
    }
    else
    {
      conditions = {status:'1', sellerId : req.body.storeId, $or : [{delivery_status : '0'},{delivery_status : '2'},{delivery_status : '4'}]}
    }
  }
  var counter = 0;
  var all_orders = [];
  var user_name = '',user_phone = '',driver_name = '';
  Orders.find(conditions, null, {sort: {'_id': -1}}, function(err, orders) {
    if(orders.length > 0){
      orders.forEach(function(data){
        Users.findOne({_id : data.userId}, function(err, user) {
          if(user != null){
            user_name = user.name;
            user_phone = user.country_code+''+user.phone;
          }
            Sellers.findOne({_id : data.driverId}, function(err, driver) {
              if(driver != null){
                driver_name = driver.driver_name;
              }
              var obj = {
                user_name : user_name,
                user_phone : user_phone,
                orderId: data.orderId,
                userId: data.userId,
                sellerId: data.sellerId,
                payment_mode: data.payment_mode,
                payable_price: data.payable_price,
                cart_items: data.cart_items,
                address: data.address,
                user_status: data.user_status,
                delivery_status: data.delivery_status,
                delivery_time: data.delivery_time,
                order_date: data.order_date,
                driverId: data.driverId,
                driver_name: driver_name,
                _id: data._id
              }
              all_orders.push(obj);
              counter = counter + 1;
              if(counter == orders.length){ 
                res.json(all_orders.sort(sortBy('-_id')));
              }
          });
        });
      });
    }
    else{
      res.json(orders); 
    }
  });
};

exports.updateOrderStatus = function(req, res) {
  var setters = {};
  if(req.body.status == '2'){
    setters = { 
      delivery_status: req.body.status,
      delivery_time: req.body.delivery_time
    }
  }
  else if(req.body.status == '5'){
    setters = { 
      driverId: req.body.driverId
    }
  }
  else{
    setters = {
      delivery_status: req.body.status
    }
  }
  Orders.update({ _id: req.body.orderId }, { $set: setters}, {new: true}, function(err, order) {
     if (order == null){
       res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      Users.findOne({_id : req.body.userId}, function(err, user_info) {
        if(user_info != null){
          if(user_info.token != null && user_info.token != '' && user_info.token != undefined){
            if(req.body.status == '1'){
              // order delivered notification
              var notis_body = 'Your order ('+req.body.orderNumber+') has been delivered successfully.';
              pushNotification(user_info.token,'Order Delivered',notis_body,req.body._id);
            }
            if(req.body.status == '2'){
              // order accept notification
              var notis_body = 'Your order ('+req.body.orderNumber+') has been accepted by seller.';
              pushNotification(user_info.token,'Order Accepted',notis_body,req.body._id);
            }
            if(req.body.status == '3'){
              // order cancel notification
              var notis_body = 'Your order ('+req.body.orderNumber+') has been cancelled by seller.';
              pushNotification(user_info.token,'Order Cancelled',notis_body,req.body._id);
            }
            if(req.body.status == '4'){
              // order on the way notification
              var notis_body = 'Your order ('+req.body.orderNumber+') is on its way.';
              pushNotification(user_info.token,'Order on its way',notis_body,req.body._id);
            }
            res.send({
              error: null,
              status: 1,
              data: order
            });
          }
          else{
            res.send({
              error: null,
              status: 1,
              data: order
            });
          }
        }
        else{
          res.send({
            error: null,
            status: 1,
            data: order
          });
        }
      });
    }
  });
};

function pushNotification(registrationId,title,notis_body,Id){
  var message = { 
    to: registrationId, 
    collapse_key: 'your_collapse_key',
    click_action:"FCM_PLUGIN_ACTIVITY",

    notification: {
       title: 'Veg',
        condition: title,
        body: notis_body,
        bedge: '',
        Id : Id 
    },

      data: { 
        title: 'Veg',
        condition: title,
        body: notis_body,
        bedge: '',
        orderId : Id
    }
  };

  fcm.send(message, function(err, response){
    if (err) {
      console.log("push notis error!");
    } else {
      console.log("push notis sent");
    }
  });
}



function firebaseNode(to, body){
  var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: to, 
    collapse_key: 'your_collapse_key',
    
    notification: {
        title: 'New notification from CrunchTime', 
        body: body 
    },
    
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