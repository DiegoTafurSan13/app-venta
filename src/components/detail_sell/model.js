const {Schema,model} = require('mongoose');

const DetailSellSchema = new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:'product',
        required:true,
    },
    sell:{
        type:Schema.Types.ObjectId,
        ref:'sell',
        required:true,
    },
    quantity:{
        type:Schema.Types.Number,
        required:true
    },
    price:{
        type:Schema.Types.Decimal128,
        required:true
    },
    discount:{
        type:Schema.Types.Decimal128,
    },
    state:{
        type:Schema.Types.Boolean,
        default:true
    },
},{
    timestamps:true
});

module.exports = model('detailSell',DetailSellSchema);