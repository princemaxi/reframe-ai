import type { SelectProps } from "../utils/interface";

const HomeSelect = ({
  options = [],
  label,
  placeholder,
  value,
  onChange,
}: SelectProps) => {
  return (
    <div className="flex flex-col space-y-1 w-[400px]">
      {label && (
        <label className="text-[#101928] text-[14px] font-medium text-center mb-4">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="rounded-lg h-8 border-2 border-[#98A2B3] text-black outline-none text-sm px-3 bg-transparent focus:border-[#1671D9] transition-all duration-200"
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HomeSelect;
