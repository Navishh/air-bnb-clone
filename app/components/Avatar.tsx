"use client";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  src: string | null | undefined;
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="hidden rounded-full md:block"
      height="25"
      width="25"
      alt="Avatar"
      src={src || "/images/user.png"}
    />
  );
};

export default Avatar;
