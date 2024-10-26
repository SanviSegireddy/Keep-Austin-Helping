"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Logo from "./logo";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between py-2">
      <Logo />

      {pathname === "/sign-in" && (
        <Link href="/sign-up">
          <Button className="bg-color2">Sign up</Button>
        </Link>
      )}
      {pathname === "/sign-up" && (
        <Link href="/sign-in">
          <Button className="bg-color2">Sign in</Button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
