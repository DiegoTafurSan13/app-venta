const {Schema,model} = require('mongoose');


const sellSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    client:{
        type:Schema.Types.ObjectId,
        ref:'client',
        required:true
    },
    typevoucher:{
        type:Schema.Types.String,
        required:true,
    },
    numbervoucher:{
        type:Schema.Types.String,
        required:true,
    },
    serievoucher:{
        type:Schema.Types.String,
        required:true,
    },
    tax:{
        type:Schema.Types.Decimal128,
        required:true,
    },
    total:{
        type:Schema.Types.Decimal128,
        required:true,
    },
    state:{
        type:Schema.Types.Boolean,
        default:true
    }
},{
    timestamps:true
});

module.exports = model('sell',sellSchema);