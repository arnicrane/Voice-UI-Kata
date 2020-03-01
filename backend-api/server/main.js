#!/usr/bin node
//
// External Dependencies
//
import express from 'express';
import bodyParser from 'body-parser';

//
// Project Dependencies
//
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
// Create non-blocking database instance and start server
const adapter = new FileAsync('db/tables.json');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// =================
// Helper Methods //
// =================

const setDefaultHeaders = response => {
  // Manage CORS to accept the preflight Options request (in case the UI ever runs on a remote server)
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "OPTIONS, GET");
  response.header("Access-Control-Allow-Headers", "Origin, Content-Type, Access-Control-Request-Headers, Access-Control-Request-Method")

  return response;
}


const handleSingleBookingGET = (request, response, next) => {

  const requestedBooking = request.db.get('bookings')
    .find({ roomNumber: request.params.roomNumber })
    .value();

  console.log('Fetched Booking:')
  console.log(requestedBooking)

  if (!requestedBooking) {
    return response.status(404).send(`Error: Booking of roomNumber ${request.params.roomNumber} could not be found`);
  } else {
    return response.status(200).send(requestedBooking);
  }

}


const errorHandler = (err, req, res, _next) => {
  res.status(500).send({ error: 'Internal Server error' });
  console.log('Internal Server error', err) // All logs will be stored in /var/log/messages in PRODUCTION
}


// ========================
// END of Helper Methods //
// ========================


low(adapter)
  .then(db => {

    // Reset DB to default bookings
    //db.setState(default_bookings)
    //db.write()

    app.use((req, res, next) => {
      res = setDefaultHeaders(res);

      // Inject DB into request object
      req.db = db;
      next();
    });

    app.get("/provisioning/bookings/:roomNumber", handleSingleBookingGET);

    app.use(errorHandler);


    const port = 8000;
    const listener = app.listen(port, function () {
      console.log('Express HTTP server listening on port ' + listener.address().port);
    });

  })
  .catch((error) => {
    // TODO: In production we would raise an alarm here in order to call out ASG support to look at service recovery
    console.log(error)
  });


module.exports = app;
