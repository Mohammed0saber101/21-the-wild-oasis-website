"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

export function ReservationList({ bookings }) {
  // currentState -> curBookings
  // optimisticValue -> bookingId
  function reducer(currentState, optimisticValue) {
    return currentState.filter((booking) => booking.id !== optimisticValue.id);
  }

  const [optimisticBokkings, optimisticDelete] = useOptimistic(
    bookings,
    reducer
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBokkings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
