"use client";

import { useActionState } from "react";
import { updateBooking } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";

export default function EditBookingForm({
  bookingId,
  cabinId,
  guestId,
  numGuests,
  observations,
  maxCapacity,
}) {
  const initialSate = {
    numGuests,
    observations,
  };

  async function reducer(prevState, formData) {
    try {
      await updateBooking(prevState, formData); // redirects on success
      // This line won’t run, but keeps return type consistent
      return { ...prevState };
    } catch (err) {
      return {
        ...prevState,
        error: err.message || "Something went wrong",
      };
    }
  }

  const [state, formAction, isPending] = useActionState(reducer, initialSate);

  return (
    <form
      action={formAction}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          defaultValue={state.numGuests}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          defaultValue={state.observations}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div>
        <input type="hidden" value={guestId} name="guestId" readOnly />
        <input type="hidden" value={cabinId} name="cabinId" readOnly />
        <input type="hidden" value={bookingId} name="bookingId" readOnly />
      </div>

      <div className="flex justify-end items-center gap-6">
        <button
          disabled={isPending}
          className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        >
          {isPending ? "Updating..." : "Update reservation"}
        </button>
      </div>
    </form>
  );
}
