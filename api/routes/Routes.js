'use strict';
module.exports = function(app) {

var users = require('../controllers/UsersCtrl');
   

    app.route('/dashboard')
    .post(users.dashboard);

    app.route('/test')
    .post(users.test);

    app.route('/login')
    .post(users.loginUser);

    app.route('/loginDriver')
    .post(users.loginDriver);

    app.route('/loginSeller')
    .post(users.loginSeller);

    app.route('/register')
    .post(users.create_user);

    app.route('/create_seller')
    .post(users.create_seller);

    app.route('/check_availability')
    .post(users.check_user);

    app.route('/check_seller')
    .post(users.check_seller);

    app.route('/verify_OTP')
    .post(users.verify_OTP);

    app.route('/address/:userId')
    .get(users.getAddresses)
    .delete(users.delete_address)
    .post(users.add_address);

    app.route('/deleteAddress')
    .post(users.delete_address);

    app.route('/defaultAddress/:userId')
    .get(users.getDefaultAddress); 

    app.route('/makeDefaultAddress')
    .post(users.makeDefaultAddress);

    app.route('/cards/:userId')
    .get(users.getCards)
    .delete(users.delete_card)
    .post(users.add_card);

    app.route('/profile/:userId')
    .get(users.getProfile);

    app.route('/loginAdmin')
    .post(users.loginAdmin);

    app.route('/createAdmin')
    .post(users.createAdmin);

    app.route('/deleteUser')
    .post(users.deleteUser);

    app.route('/deleteSeller')
    .post(users.deleteSeller);

    app.route('/getAllUsers')
    .post(users.getAllUsers) 

    app.route('/editUser')
    .post(users.editUser) 
   

    app.route('/sellers')
    .get(users.getAllSellers);

    app.route('/getAllSellers')
    .post(users.getAllSellers);


    app.route('/drivers')
    .get(users.getAllDrivers);

    app.route('/changePassword')
    .post(users.changePassword);

    app.route('/sellerProfile/:id')
    .get(users.sellerProfile);

    app.route('/updateSellerInfo')
    .post(users.updateSellerInfo);

    app.route('/updateDriverInfo')
    .post(users.updateDriverInfo);

    app.route('/changeSellerPassword')
    .post(users.changeSellerPassword);

    app.route('/updateSellerContact')
    .post(users.updateSellerContact);

    app.route('/setTiming')
    .post(users.setTiming);

    app.route('/PayAuth')
    .post(users.PayAuth);

    app.route('/getWallet/:userId')
    .get(users.getWallet);

    app.route('/walletAmount/:userId')
    .get(users.walletAmount);

    app.route('/changePhoneOTP')
    .post(users.changePhoneOTP);

    app.route('/changePhoneVerify')
    .post(users.changePhoneVerify);

    app.route('/forgotAccount')
    .post(users.forgotAccount);


    app.route('/forgotAccountUser')
    .post(users.forgotAccountUser);

    app.route('/resetpasswordUser')
    .post(users.resetpasswordUser);

    app.route('/resetpassword')
    .post(users.resetpassword);

    app.route('/updateSellerAccount')
    .post(users.updateSellerAccount);

    app.route('/getTopSellers')
    .post(users.getTopSellers);


    app.route('/directResetPasswordUser')
    .post(users.directResetPasswordUser);

    app.route('/updateUsersAccount/:_id/:email/:phone')
    .post(users.updateUsersAccount);

    app.route('/addAddresses')
    .post(users.addAddresses);

    app.route('/editAddress')
    .post(users.editAddress);

    app.route('/getUserAddresses')
    .post(users.getUserAddresses);

    app.route('/seacrchSellers')
    .post(users.seacrchSellers);

    app.route('/placeOrderURL/:random')
    .get(users.placeOrderURL);

    
    app.route('/removeAddresses')
    .post(users.removeAddresses);

    app.route('/pfpay')
    .get(users.pfpay);

    app.route('/orderNow')
    .get(users.orderNow);

    app.route('/getAllUserNotifications')
    .post(users.getAllUserNotifications);

    app.route('/COD')
    .post(users.CODelivery);

    app.route('/addCart')
    .post(users.addCart);

    app.route('/getPreviousOrders')
    .post(users.getPreviousOrders);
    
    app.route('/getUpcomingOrders')
    .post(users.getUpcomingOrders);

        
    app.route('/checkCart')
    .post(users.checkCart);

var products = require('../controllers/ProductsCtrl');
	app.route('/products/:type/:storeId')
    .get(products.getProducts); 

    app.route('/getAllProducts')
    .post(products.getAllProducts);

    app.route('/getProductsByCat')
    .post(products.getProductsByCat);

     app.route('/add_product')
    .post(products.add_product);

    app.route('/add_extras')
    .post(products.add_extras);

    app.route('/getSingleExtras')
    .post(products.getSingleExtras);

    app.route('/getAllExtras')
    .post(products.getAllExtras);

    app.route('/delete_extras')
    .post(products.delete_extras);

    app.route('/edit_product')
    .post(products.edit_product);

    app.route('/getTodayDeals')
    .get(products.getTodayDeals);

    app.route('/getStoreOrders/:storeId')
    .get(products.getStoreOrders);

    app.route('/editProducts')
    .post(products.editProducts);

    app.route('/edit_extras')
    .post(products.edit_extras);

    app.route('/getCartItems')
    .post(products.getCartItems);

    app.route('/placeOrder')
    .post(products.add_order);

    app.route('/deleteProduct')
    .post(products.delete_products); 

    app.route('/myOrders')
    .post(products.getUserOrders);

    app.route('/getSellerOrders')
    .post(products.getSellerOrders);

    app.route('/updateOrderStatus')
    .post(products.updateOrderStatus);

    app.route('/add_coupon')
    .post(products.add_coupon);

    app.route('/applyCoupon')
    .post(products.applyCoupon);

    app.route('/sliders')
    .get(products.sliders);

    app.route('/categories')
    .get(products.categories);

    app.route('/getSingleProduct')
    .post(products.getSingleProduct);


    app.route('/getAllCoupons')
    .post(users.getAllCoupons);


    app.route('/addCoupon')
    .post(users.addCoupon);

    app.route('/removeThisCoupon')
    .post(users.removeThisCoupon);

    app.route('/updateThisCoupon')
    .post(users.updateThisCoupon);


    app.route('/getMyOrders')
    .post(users.getMyOrders);

    app.route('/filterOrders')
    .post(users.filterOrders);


    app.route('/applyCoupon1')
    .post(users.applyCoupon1);
    

    app.route('/getUnreadUserNotifications')
    .post(users.getUnreadUserNotifications);


    app.route('/getSellersByCat')
    .post(users.getSellersByCat);


    app.route('/getSingleSeller')
    .post(users.getSingleSeller);

    app.route('/checkDistance')
    .post(users.checkDistance);

    app.route('/createDriver')
    .post(users.createDriver);


    app.route('/getAllDrivers')
    .post(users.getAllDrivers);


    app.route('/getSingleDriver')
    .post(users.getSingleDriver);

    app.route('/updateDriver')
    .post(users.updateDriver);


    app.route('/deleteDriver')
    .post(users.deleteDriver);

    app.route('/getOrderDetails')
    .post(users.getOrderDetails);

    app.route('/updateOrder')
    .post(users.updateOrder);

    app.route('/getDriverUpcomingOrders')
    .post(users.getDriverUpcomingOrders);


    app.route('/getDriverPreviousOrders')
    .post(users.getDriverPreviousOrders);

    app.route('/updateOrderByDriver')
    .post(users.updateOrderByDriver);

    app.route('/updateOrderLocation')
    .post(users.updateOrderLocation);

    app.route('/rateDriver')
    .post(users.rateDriver);

    app.route('/emailTest')
    .post(users.emailTest);

    app.route('/getTransactions')
    .post(users.getTransactions);

    app.route('/getAccountIds')
    .post(users.getAccountIds);


    app.route('/updateDriverLocation')
    .post(users.updateDriverLocation);

    app.route('/logout')
    .post(users.logout);

};
