const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://rfbeier:Radar1598@cluster0.spq6q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'soloProject'
}).then(() => console.log('Connected to Mongo DB.'))
.catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema( {
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    currentWeek:{type:Number, required:true},
    totalWeeks:{type:Number, required:true},
    habitList: [String],
    savedStates: [[Number]]
})

module.exports = mongoose.model('user', userSchema)