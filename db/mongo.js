let MongoClient = require('mongodb').MongoClient

const dbName = 'demo-db'
const table = 'employees'
const url = `mongodb://0.0.0.0:27017`

MongoDAO = function() {

    this.isConnected = () => {
        return this.client.connect((err, db) => {
            if (err) {
                console.log(err);
                return false;
            }
            console.log("Connection Successful!");
            return true;
        })
    };

    this.addEmployee = (employee, callback) => {
        console.log('Inserting ', employee);
        const client = new MongoClient(url);
        const db = client.db(dbName);
        const collection = db.collection(table);
        client.connect(err => {
            try {
                collection.insertOne(employee, (error, response) => {
                    if (error) {
                        console.log('The insertion failed.', error);
                        callback(error);
                    } else {
                        console.log('The insertion was successful.');
                        callback(response);
                    }
                });
            } catch (e) {
                console.log(e);
                callback(e);
            }
        });
    };

    this.addRandomEmployee = callback => {
        console.log('Inserting Random Employee');
        const client = new MongoClient(url);
        const db = client.db(dbName);
        const collection = db.collection(table);

        employee = generateRandomEmployee();
        client.connect(err => {
            try {
                collection.insertOne(employee, (error, response) => {
                    if (error) {
                        console.log('The insertion failed.', error);
                        callback(error);
                    } else {
                        console.log('The insertion was successful.');
                        callback(response);
                    }
                });
            } catch (e) {
                console.log(e);
                callback(e);
            }
        });
    };

    this.getEmployees = callback => {
        console.log('Retrieving all employees...');
        const client = new MongoClient(url);
        const db = client.db(dbName);
        const collection = db.collection(table);
        client.connect(err => {
            try {
                collection.find({}).toArray((error, response) => {
                    if (error) {
                        console.log('The retrieval failed.', error);
                        callback(error);
                    } else {
                        console.log('The retrieval was successful.');
                        callback(response);
                    }
                });
            } catch (e) {
                console.log(e);
                callback(e);
            }
        });
    };
}

function generateRandomEmployee() {
    const names = ["Andrew", "Joanna", "Michael", "Max", "Laura", "Nico", "John", "Maria", "Rowan", "Rita", "Bianca", "Diaz"];
    return {
        name: names[getRandomInt(0, names.length-1)],
        age: getRandomInt(18, 65),
        salary: getRandomInt(1000, 3000)
    }
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max-min));
}

exports.MongoDAO = MongoDAO