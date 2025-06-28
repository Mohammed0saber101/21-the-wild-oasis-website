/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { auth } from "@/app/_lib/auth";
import NavLink from "./NavLink";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <NavLink href="/cabins" label="cabin" />
        </li>
        <li>
          <NavLink href="/about" label="About" />
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center justify-center gap-2"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt="Profile Image"
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <NavLink href="/account" label="Guest area" />
          )}
        </li>
      </ul>
    </nav>
  );
}
