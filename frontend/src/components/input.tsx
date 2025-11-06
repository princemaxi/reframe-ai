import { useState, useRef, useEffect } from "react";
import type { InputProps } from "../utils/interface";

const HomeInput = ({
  type,
  placeholder,
  icon,
  iconPosition = "left",
  suggestions = [],
  onComplete,
}: InputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  // ✅ Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ When user selects a suggestion
  const handleSelect = (value: string) => {
    setInputValue(value);
    setShowSuggestions(false);
    if (onComplete) onComplete(value); // trigger next step
  };

  // ✅ When user presses Enter manually
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setShowSuggestions(false);
      if (onComplete) onComplete(inputValue.trim());
    }
  };

  return (
    <div ref={inputRef} className="relative w-[400px]">
      <div
        className={`flex items-center border-2 border-[#98A2B3] rounded-lg h-10 px-2 transition-all duration-200 focus-within:border-[#1671D9] ${
          iconPosition === "right" ? "flex-row-reverse" : ""
        }`}
      >
        {icon && (
          <span className="text-[#98A2B3] flex items-center justify-center w-5 h-5 mx-1">
            {icon}
          </span>
        )}
        <input
          type={type}
          value={inputValue}
          placeholder={placeholder}
          onFocus={() => setShowSuggestions(true)}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-black outline-none placeholder:text-[#98A2B3] placeholder:text-[12px] text-sm px-1"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg text-left max-h-48 overflow-y-auto">
          {suggestions
            .filter((item) =>
              item.title.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item.title)}
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {item.title}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default HomeInput;
