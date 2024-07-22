"use client";
import Image from "next/image";
const Logo = () => {
  return (
    <Image
      alt="Logo"
      className="hidden md:block cursor-pointer"
      height="100"
      width="100"
      src="/images/air-bnb-logo.png"
    />
  );
};

export default Logo;
