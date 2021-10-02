const {Schema,model} = require('mongoose');


const userSchema = new Schema({
    role:{
        type:Schema.Types.ObjectId,
        ref:'role',
        required:true
    },
    employed:{
        type:Schema.Types.ObjectId,
        ref:'employed',
        required:true,
        unique:true
    },
    username:{
        type:Schema.Types.String,
        required:true,
        unique:true
    },
    password:{
        type:Schema.Types.String,
        required:true,
    },
    email:{
        type:Schema.Types.String,
        required:true,
        unique:true
    },
    state:{
        type:Schema.Types.Boolean,
        default:true
    }
},{
    timestamps:true
});

module.exports = model('user',userSchema);