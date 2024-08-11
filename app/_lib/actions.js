"use server";
import { revalidatePath } from "next/cache";
// above "use server" is bridge from client to server
import { auth, signIn, signOut } from "./auth";
import { validateNationalID } from "./helper";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("need to be logged in to update guest");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!validateNationalID(nationalID)) {
    throw new Error("Invalid National ID");
  }
  const updatedData = {
    nationalID,
    nationality,
    countryFlag,
  };
  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
  console.log("updated...");
}
export async function DeleteReservations(bookingId) {
  // await new Promise((res) => setTimeout(res, 3000));
  // throw new Error("Booking could not be deleted");
  const session = await auth();
  if (!session) throw new Error("need to be logged in to update guest");
  const bookings = await getBookings(session.user.guestId);
  const bookingsIds = bookings.map((booking) => booking.id);
  if (!bookingsIds.includes(bookingId)) {
    throw new Error("Booking does not exist");
  }
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}
export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("need to be logged in to update guest");
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: +formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  const { error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    // console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
  // console.log(newBooking);
}
export async function editReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("need to be logged in to update guest");
  const bookingId = +formData.get("bookingId");
  const bookings = await getBookings(session.user.guestId);
  const bookingsIds = bookings.map((booking) => booking.id);
  console.log(formData);
  if (!bookingsIds.includes(bookingId)) {
    throw new Error("Booking does not exist");
  }
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations").slice(0, 1000);
  const updatedData = {
    numGuests,
    observations,
  };
  const { error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    // console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
