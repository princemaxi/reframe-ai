import type { ButtonProps } from "../utils/interface";

const HomeButton = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="
        bg-[#101928] 
        text-white 
        rounded-lg 
        cursor-pointer 
        text-[16px] 
        font-normal 
        px-[24.5px] 
        py-[10.5px] 
        transition-all 
        duration-300 
        ease-in-out 
        hover:bg-[#1a2333] 
        hover:scale-[1.03]
        active:scale-[0.97]
        active:bg-[#0d121b]
        shadow-md
        hover:shadow-lg
       
      "
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default HomeButton;
