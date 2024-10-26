"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="alt"
          width={30}
          height={30}
          loading="lazy"
        />
        <p className="font-merriweather-900 text-xl uppercase tracking-wide">
          Keep Austin Helping
        </p>
      </Link>
    </div>
  );
};

export default Logo;
