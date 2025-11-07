"use client";
import { useState, useRef, useEffect } from "react";
import HomeSelect from "../components/select";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface JobRowProps {
  nextStep: () => void;
}

const JobRow = ({ nextStep }: JobRowProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selected, setSelected] = useState<Date>();
  const [jobLevel, setJobLevel] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto move to next step when both filled
  useEffect(() => {
    if (jobLevel && selected) {
      const timer = setTimeout(() => {
        nextStep();
      }, 200); // slight delay to show date selection feedback
      return () => clearTimeout(timer);
    }
  }, [jobLevel, selected, nextStep]);

  return (
    <div className="flex justify-center items-center m-auto flex-col min-h-screen relative">
      <HomeSelect
        value={jobLevel}
        label="Job role level"
        options={[
          "--Select level--",
          "Beginner",
          "Intermediate",
          "Professional",
        ].map((level) => ({
          label: level,
          value: level,
        }))}
        onChange={(value) => setJobLevel(value)}
      />

      <div className="relative mt-6 w-[400px]" ref={inputRef}>
        <label className="text-[#101928] text-[14px] mb-2 block text-center font-medium">
          Interview date
        </label>
        <input
          readOnly
          onClick={() => setShowCalendar(true)}
          value={selected ? selected.toLocaleDateString() : "MM/DD/YYYY"}
          className="border-2 h-8 border-[#98A2B3] rounded-lg px-3 py-2 w-[400px] text-sm text-gray-700 cursor-pointer"
        />

        {showCalendar && (
          <div className="absolute top-[60px] left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl p-3 z-50">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(date) => {
                setSelected(date);
                setShowCalendar(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRow;
