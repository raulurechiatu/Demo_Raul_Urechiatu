let mongoClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:27017/EmployeeDB'

mongoClient.connect(url, function(err, db) {
    if (err) throw err

    console.log("Connected!")
})

module.exports = mongoClient