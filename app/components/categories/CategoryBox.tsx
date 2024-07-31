import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback(() => {
    //define empty query
    let currentQuery = {};

    //look for current params & pass them
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    //spread the current query & add the nex category
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    //check if the category is already seelcted & remove it from updated query
    if (params?.get("category") == label) {
      delete updatedQuery.category;
    }

    //generate the url
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex transition cursor-pointer flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
        `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium "> {label}</div>
    </div>
  );
};

export default CategoryBox;
