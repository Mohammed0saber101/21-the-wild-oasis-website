"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ label, href }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`hover:text-accent-400 transition-colors ${
        isActive ? "text-accent-500" : ""
      }`}
    >
      {label}
    </Link>
  );
}
