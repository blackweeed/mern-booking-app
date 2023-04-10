import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  return (
    <div className="grid grid-cols-2">
      <div>
        Check-in: {place.checkIn} <br />
        Check-out: {place.checkOut} <br />
        Max number of guests: {place.maxGuests}
      </div>
      <div>
        <div className="bg-white shadow-lg p-4 rounded-2xl">
          <div className="text-2xl text-center mb-4">
            Price: ${place.price} / per night
          </div>
          <div className="border rounded-2xl mt-4">
            <div className="flex">
              <div className="flex gap-2 flex-wrap py-3 px-4 flex-1">
                <label>Check in:</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className="flex gap-2 py-3 px-4 border-l flex-1">
                <label>Check out:</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              {numberOfNights > 0 && (
                <div className="py-3 px-4 border-t">
                  <label>Your full name:</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="[+]{0,1}[0-9]{2}[ ]{0,1}[0-9]{3}[ ]{0,1}[0-9]{3}"
                    required
                    placeholder="788-123-123"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  ></input>
                </div>
              )}
            </div>
          </div>
          <div className="text-center py-2">
            <label>Number of guests</label>
            <input type="number" value={numberOfGuests} />
          </div>
          <button className="primary mt-4">
            Book this place{" "}
            {numberOfNights > 0 && <span>${numberOfNights * place.price}</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
