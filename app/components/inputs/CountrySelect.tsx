"use client";

import useCountries from "@/app/hooks/useCountry";
import Select from "react-select";

export type CountrySelectValue = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: CountrySelectValue) => (
          <div className="flex flex-row items-center gap-3">
            <img
              src={option.flag}
              alt={`${option.label} flag`}
              className="w-6 h-4"
            />
            <div>
              {option.label},
              <span className="ml-1 text-neutral-500">{option.region}</span>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CountrySelect;
