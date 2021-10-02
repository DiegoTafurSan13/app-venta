const {Schema,model} = require('mongoose');


const roleSchema = new Schema({
   
    name:{
        type:Schema.Types.String,
        required:true,
        unique:true
    },
    description:{
        type:Schema.Types.String,
    },
    
    state:{
        type:Schema.Types.Boolean,
        default:true
    }
},{
    timestamps:true
});

module.exports = model('role',roleSchema);