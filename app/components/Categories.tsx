import { usePathname, useSearchParams } from "next/navigation";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach } from "react-icons/tb";
import CategoryBox from "./CategoryBox";
import Container from "./Container";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern",
  },
];

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
