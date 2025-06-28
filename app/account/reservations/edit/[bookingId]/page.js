import EditBookingForm from "@/app/_components/EditBookingForm";
import { auth } from "@/app/_lib/auth";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { user } = await auth();
  const { bookingId } = await params;

  const { cabinId, numGuests, observations } = await getBooking(
    bookingId,
    user.guestId
  );
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <EditBookingForm
        bookingId={bookingId}
        cabinId={cabinId}
        guestId={user.guestId}
        numGuests={numGuests}
        observations={observations}
        maxCapacity={maxCapacity}
      />
    </div>
  );
}
