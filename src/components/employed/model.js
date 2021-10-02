const {Schema,model} = require('mongoose');

const employedSchema = new Schema({
    lastname:{
        type:Schema.Types.String,
        required:true,
    },
    name:{
        type:Schema.Types.String,
        required:true
    },
    position:{
        type:Schema.Types.String,
        default:'CASHIER'
    },
    datebirth:{
        type:Schema.Types.Date,
        required:true,
    },
    datecontract:{
        type:Schema.Types.Date,
        required:true
    },
    address:{
        type:Schema.Types.String,
        required:true,
    },
    city:{
        type:Schema.Types.String,
        required:true,
    },
    region:{
        type:Schema.Types.String,
        required:true,
    },
    country:{
        type:Schema.Types.String,
        required:true,
    },
    phone:{
        type:Schema.Types.Number,
        required:true,
    },
    state:{
        type:Schema.Types.Boolean,
        default:true
    },
},{
    timestamps:true
});

module.exports = model('employed',employedSchema);