"use server";

import { signIn, signOut, auth } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 500),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateGuest(currentState, formData) {
  const session = await auth();
  if (!session) {
    return { ...currentState, error: "You must be logged in" };
  }

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const regex = /^[a-zA-Z0-9]{6,12}$/;

  if (!regex.test(nationalID)) {
    return { ...currentState, error: "Please provide a valid national ID" };
  }

  const updateData = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  revalidatePath("/account/profile");

  if (error) {
    return { ...currentState, error: error.message };
  }

  return {
    ...data,
    error: null,
  };
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateBooking(currentState, formData) {
  console.log(formData);
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const updatedFields = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 500),
  };

  const guestId = formData.get("guestId");
  const cabinId = formData.get("cabinId");
  const bookingId = formData.get("bookingId");

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .eq("cabinId", cabinId)
    .eq("guestId", guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  redirect("/account/reservations");
}
