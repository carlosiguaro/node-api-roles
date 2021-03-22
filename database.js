var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/companydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err))