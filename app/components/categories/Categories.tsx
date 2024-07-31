"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Container from "../Container";
import { categories } from "./allcategories";
import CategoryBox from "./CategoryBox";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname == "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <div>
      <Container>
        <div className="flex flex-row items-center justify-between pt-4 overflow-x-auto ">
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
