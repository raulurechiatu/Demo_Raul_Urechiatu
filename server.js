'use strict';

const MongoDAO = require('./db/mongo.js').MongoDAO;
let mongoDAO = new MongoDAO();
const Hapi = require('@hapi/hapi');
const util = require('util');

const init = async () => {

    const server = Hapi.server({
        port: 8000,
        host: '0.0.0.0'
    });

    server.route({
        method: 'GET',
        path: '/health',
        handler: (request, h) => {
            return 'Raul\'s Demo Application is running properly!';
        }
    });

    server.route({
        method: 'GET',
        path: '/db/test',
        handler: (request, h) => {
            if (mongoDAO.isConnected) {
                return "Connection successful";
            } else {
                return h.response('There is an issue with the DB').code(400);
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/db/employees/insert',
        handler: (request, h) => {
            const employee = request.payload;
            const addEmployee = util.promisify(mongoDAO.addEmployee);
            return addEmployee(employee).then(response => {
                console.log(response);
                return response;
            }).catch(err => {
                return err;
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/db/employees/insert/random',
        handler: (request, h) => {
            const employee = request.payload;
            const addRandomEmployee = util.promisify(mongoDAO.addRandomEmployee);
            return addRandomEmployee().then(response => {
                console.log(response);
                return response;
            }).catch(err => {
                return err;
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/db/employees',
        handler: (request, h) => {
            const getEmployees = util.promisify(mongoDAO.getEmployees);
            return getEmployees().then(employees => {
                return employees;
            }).catch(err => {
                return err;
            })
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();