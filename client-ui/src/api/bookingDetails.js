import { BOOKINGS_API_ENDPOINT } from "../constants/constants";

export const fetchBookingDetails = async roomNumber => {
  const url = BOOKINGS_API_ENDPOINT + '/provisioning/bookings/' + roomNumber;
  let data = await fetch(url, {
    method: 'get',
    headers: new Headers({
      "Accept": 'application/json',
      'Content-Type': 'application/json'
    })
  });

  if (data.status === 200) {
    return await data.json();
  } else if (data.status === 404) {
    return null;
  } else {
    return null;
  }

};
