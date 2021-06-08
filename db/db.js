const mongoose = require('mongoose')

mongoose
.connect('mongodb+srv://Back:1w2w3w4w5w@cluster0.vtf8l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
useNewUrlParser:true,
useUnifiedTopology: true
}
)
.then(() => console.log ('MongoDb has been start!'))
.catch(err => console.log(err));

module.exports = mongoose;

