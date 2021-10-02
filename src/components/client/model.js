const {Schema,model} = require('mongoose');

const clientSchema = new Schema({
    typedocument:{
        type:Schema.Types.String,
        required:true,
    },
    numberdocument:{
        type:Schema.Types.String,
        required:true,
        unique:true
    },
    name:{
        type:Schema.Types.String,
        required:true
    },
    address:{
        type:Schema.Types.String
    },
    phone:{
        type:Schema.Types.Number,
    },
    state:{
        type:Schema.Types.Boolean,
        default:true
    }
},{
    timestamps:true
});

module.exports = model('client',clientSchema);