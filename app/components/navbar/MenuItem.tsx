"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

import React from "react";

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 font-semibold hover:bg-neutral-100 trnasition"
    >
      {label}
    </div>
  );
};

export default MenuItem;
