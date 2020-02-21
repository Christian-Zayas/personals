const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGODB_URL}`
               ,{ useNewUrlParser : true ,  useUnifiedTopology: true  , useCreateIndex: true})
               .then(result => console.log('Is connect a mongodb'))
               .catch(error => console.error(error))
                 