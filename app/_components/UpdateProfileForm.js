/* eslint-disable @next/next/no-img-element */
"use client";

import { updateGuest } from "@/app/_lib/actions";
import { useActionState } from "react";

export default function UpdateProfileForm({ children, guest }) {
  const initialState = guest;

  const reducer = async (prevState, formData) => {
    return await updateGuest(prevState, formData);
  };

  const [state, formAction, isPending] = useActionState(reducer, initialState);

  const { fullName, email, nationalID, nationality, countryFlag, error } =
    state;

  return (
    <form
      action={formAction}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      {error && <p className="text-red-400">{error}</p>}

      <div className="space-y-2">
        <label>Full name</label>
        <input
          defaultValue={fullName}
          name="fullName"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          defaultValue={email}
          name="email"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button isPending={isPending} />
      </div>
    </form>
  );
}

function Button({ isPending }) {
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={isPending}
    >
      {isPending ? "Updating..." : "Update profile"}
    </button>
  );
}
