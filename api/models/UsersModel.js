'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    name: {
      type: String
    },
    description: {
      type: String
    },
    country_code: {
      type: Number
    },
    phone: {
      type: Number,
      default: ''
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    image: {
      type: String
    },
    registered_on: {
      type: Date,
    },
    token: {
      type: String
    },
    referCode: {
      type: String
    },
    money: {
      type: Number
    },
    address:{ 
      type: String,
      default: ''
    },
    status: {
      type: String,
      default : '1'
    }

});

var DriverSchema = new Schema({
  associateSeller: {
    type: []
  },
  sellerId: {
    type: String
  },
  name: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  pin: {
    type: String
  },
  description: {
    type: String
  },
  phone: {
    type: Number
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  image: {
    type: String
  },
  token: {
    type: String
  },
  address:{
    type: String
  },
  lat:{
    type: String
  },
  lng:{
    type: String
  },
  
    status: {
      type: String,
      default : '1'
    }
  

}, {timestamps: true});

var SellersSchema = new Schema({
    accountKey:{
      type: String
    },
    accountCode: {
      type: String
    },
    store_name: {
      type: String
    },
    driver_name: {
      type: String
    },
    country_code: {
      type: Number
    },
    phone: {
      type: Number
    },
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    pin: {
      type: String
    },
    image: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    lat: {
      type: String
    },
    lng: {
      type: String
    },
    rating: {
      type: String
    },
    registered_on: {
      type: Date,
    },
    token: {
      type: String
    },
    type: {
      type: String
    },
    timing: {
      type: Array
    },
    isActive: {
      type: String
    },
    not_admin:{
      type: Number,
      default: 1
    },
    orders: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default : '1'
    }
});

var OTPSchema = new Schema({
    country_code: {
      type: Number
    },
    phone: {
      type: Number
    },
    otp: {
      type: Number
    },
    user_type: {
      type: String
    }
});


var notificationsSchema = new Schema({   //1 for order placed
  type:{
    type: String,
  },
  to: {
    type: String,
  },
  from: {
    type: String,
  },
  items: {
    type: Object
  },
  isRead: {
    type: String,
    default: '0'
  },
  status: {
    type: String,
    default : '1'
  }

},{timestamps: true});

var driverNotificationsSchema = new Schema({   //1 for order placed
  type:{
    type: String,
  },
  to: {
    type: String,
  },
  orderId:{
    type: String,
  },
  isRead: {
    type: String,
    default: '0'
  },

},{timestamps: true});

var AddressSchema = new Schema({
    name: {
      type: String
    },
    address1: {
      type: String
    },
    address2: {
      type: String
    },
    city: {
      type: String
    },
    is_default: {
      type: String
    },
    phone: {
      type: String
    },
    userId: {
      type: String
    },
    status: {
      type: String,
      default : '1'
    }
});

var AddressesSchema = new Schema({
  address: {
    type: String
  },
  userId: {
    type: String
  },
  lat:{
    type: String
  },
  lng:{
    type: String
  },
  status: {
    type: String,
    default : '1'
  }
});

var CardsSchema = new Schema({
    card_number: {
      type: String
    },
    cvv: {
      type: String
    },
    zip: {
      type: String
    },
    expiry: {
      type: String
    },
    userId: {
      type: String
    },
    status: {
      type: String,
      default : '1'
    }
});

var AdminSchema = new Schema({
    fname: {
      type: String
    },
    lname: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    image: {
      type: String
    },
    phone: {
      type: Number
    }
});

var WalletSchema = new Schema({
    userId: {
      type: String
    },
    type: {
      type: String
    },
    money_type: {
      type: String
    },
    amount: {
      type: Number
    },
    others: {
      type: Object
    },
    date_created: {
      type: String
    }
});

var ForgotEmailSchema = new Schema({
  email: {
    type: String
  },
  otp: {
    type: String
  },
  date_created: {
    type: String
  }
});

var CartSchema = new Schema({
  items: {
    type: []
  },
  orderDate: {
    type: String
  },
  orderTime: {
    type: String
  },
  orderMode:{
    type: String
  },
  userId: {
    type: String
  },
  extraStuff:  {
    type: Object,
    default: {}
  },
  status: {
    type: String,
    default : '1'
  }
},{timestamps: true});


var TransactionsSchema = new Schema({
  toId: {
    type: String
  },
  orderId: {
    type: String
  },
  amount:  {
    type: String
  },
  status: {
    type: String,
    default : '1'
  }
},{timestamps: true});

module.exports = mongoose.model('Users', UsersSchema);
module.exports = mongoose.model('OTP', OTPSchema);
module.exports = mongoose.model('Address', AddressSchema);
module.exports = mongoose.model('Addresses', AddressesSchema);
module.exports = mongoose.model('Cards', CardsSchema);
module.exports = mongoose.model('Admin', AdminSchema);
module.exports = mongoose.model('Sellers', SellersSchema);
module.exports = mongoose.model('Wallet', WalletSchema);
module.exports = mongoose.model('ForgotEmail', ForgotEmailSchema);
module.exports = mongoose.model('Cart', CartSchema);
module.exports = mongoose.model('Notifications', notificationsSchema);
module.exports = mongoose.model('driverNotifications', driverNotificationsSchema);
module.exports = mongoose.model('Driver', DriverSchema);
module.exports = mongoose.model('Transactions', TransactionsSchema);
