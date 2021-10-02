const {Schema,model} = require('mongoose');


const productSchema = new Schema({
    category:{
        type:Schema.Types.ObjectId,
        ref:'categories',
        required:true
    },
    code:{
        type:Schema.Types.String,
        required:true,
        unique:true
    },
    name:{
        type:Schema.Types.String,
        required:true,
        unique:true
    },
    description:{
        type:Schema.Types.String,
    },
    pricesell:{
        type:Schema.Types.Decimal128,
        default:0.0,
    },
    stock:{
        type:Schema.Types.Number,
        default:0
    },
    image:{
        type:Schema.Types.String,
    },
    state:{
        type:Schema.Types.Boolean,
        default:true
    }
},{
    timestamps:true
});

module.exports = model('product',productSchema);