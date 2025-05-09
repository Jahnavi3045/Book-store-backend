const mongoose=require('mongoose')
const {Schema}=mongoose

const bookSchema=new Schema({
    title:{
        type:String,
        required:[true,'Title is required']
    },
    author:{
        type:String,
        required:[true,'Author is required']
    },
    description:{
        type:String,
        required:[true,'Description is required'],
        maxlength:1000
    },
    price:{
        type:Number,
        required:[true,'Price is required'],
        min:0
    },
    genre:{
        type:String,
        required:[true,'Genre is required']
    },
    condition:{
        type:String,
        required:[true,'Condition is required'],
        enum:["New","Like New","Used-Good","Used-Acceptable"],
    },
    edition:{
        type:String,
    },
    imageUrl:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['Available','Sold'],
        default:"Available",
    }
},{timestamps:true});

const Book=mongoose.model('Book',bookSchema)

module.exports=Book