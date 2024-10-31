import Link from "next/link";
import React from "react";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

function Socials() {
  return (
    <div className="flex justify-center gap-x-5 p-8 text-yellow-800">
      <Link
        target="_blank"
        href="https://www.facebook.com/profile.php?id=61567784455518"
      >
        <FaFacebookSquare size={40} />
      </Link>

      <Link target="_blank" href="https://www.instagram.com/keepaustinhelping/">
        <FaInstagram size={40} />
      </Link>
      <Link href={"mailto:keepaustinhelping@gmail.com"}>
        <IoIosMail size={40} />
      </Link>
    </div>
  );
}

export default Socials;
