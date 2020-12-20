const mongoose = require('mongoose');
// paramétre de connexion mongodb
mongoose.connect("mongodb+srv://chatCord:Ab.19081990@cluster0.y25u3.mongodb.net/<dbname>?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true })


mongoose.connection.once('open',()=>{
    console.log('Toi, tu rentres')

})
.on('error',(error)=>{
    console.log('Oups...'+error)
})