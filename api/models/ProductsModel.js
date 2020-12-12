'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    categories: {
      type: String
    },
    description: {
      type: String
    },
    name: {
      type: String
    },
    image: {
      type: String
    },
    price: {
      type: String
    },
    discount: {
      type: String,
      default: '0'
    },
    discount_type: {
      type: String,
      default: '1'
    },
    quantity: {
      type: String
    },
    quantity_type: {
      type: String
    },
    category: {
      type: String
    },
    in_stock: {
      type: String
    },
    storeId: {
      type: String
    },
    status: {
      type: String,
      default : '1'
    }
});

var OrdersSchema = new Schema({
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
    sellerId: {
      type: String
    },
    driverId: {
      type: String,
      default: '0'
    },
    payment_mode: {   //cod and pf
      type: String
    },
    payable_price: {
      type: Number
    },
    cart_items: {
      type: Array
    },
    address: {
      type: String
    },
    address_id: {
      type: String
    },

    // <span *ngIf="element.delivery_status=='0'">Pending</span> 
    // <span *ngIf="element.delivery_status=='1'">Delivered</span> 
    // <span *ngIf="element.delivery_status=='2'">Being Cooked</span> 
    // <span *ngIf="element.delivery_status=='3'">On its way</span> 
    // <span *ngIf="element.delivery_status=='4'">Cancelled</span> 
    // <span *ngIf="element.delivery_status=='5'">Arrived</span> 
    // <span *ngIf="element.delivery_status=='6'">Accepted</span>  
    // <span *ngIf="element.delivery_status=='7'">Rejected</span> 

    delivery_status: {  
      type: Number
    },
    delivery_time: {
      type: String
    },
    cartId:{
      type: String
    },
    lat:{
      type: String
    },
    lng: {
      type: String
    },
    rating: {
      type: String
    },
    tip: {
      type: String
    },
    is_rated: {
      type: String,
      default: '0'
    },
    status: {
      type: String,
      default : '1'
    }
}, {timestamps: true});

var CouponsSchema = new Schema({
    userId: {
      type: String
    },
    name: {
      type: String
    },
    expiry_date: {
      type: String
    },
    minimum_value: {
      type: String
    },
    off_upto_amount: {
      type: String
    },
    off_type: {
      type: String
    },
    how_many_times: {
      type: String
    },
    status: {
      type: String,
      default: '1'
    }
});

var BannersSchema = new Schema({
    image: {
      type: String
    },
    position: {
      type: String
    }
});

var CategoriesSchema = new Schema({
    image: {
      type: String
    },
    name: {
      type: String
    },
    position: {
      type: String
    },
    type: {
      type: String
    },
    status: {
      type: String,
      default : '1'
    }
});


var ExtrasSchema = new Schema({
  image: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: String
  },
  sellerId: {
    type: String
  },
  status: {
    type: String,
    default : '1'
  }
});

module.exports = mongoose.model('Products', ProductsSchema);
module.exports = mongoose.model('Orders', OrdersSchema);
module.exports = mongoose.model('Coupons', CouponsSchema);
module.exports = mongoose.model('Banners', BannersSchema);
module.exports = mongoose.model('Categories', CategoriesSchema);
module.exports = mongoose.model('Extras', ExtrasSchema);