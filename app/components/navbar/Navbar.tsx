"use client";

import { SafeUser } from "@/app/types";
import Categories from "../categories/Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./search";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  console.log({ currentUser });
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm ">
      <div className=" py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
