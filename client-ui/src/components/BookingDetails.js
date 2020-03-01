import React from "react";

const BookingDetails = ({
  bookingDetails
}) => {
  return (
    <React.Fragment>
      <h2>Booking Details</h2>

      <table>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Card Holder</th>
            <th>Number of People</th>
            <th>Duration of Stay</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{bookingDetails.roomNumber}</td>
            <td>{bookingDetails.cardHolder}</td>
            <td>{bookingDetails.residentCount}</td>
            <td>{bookingDetails.duration}</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );

}

export default BookingDetails;
