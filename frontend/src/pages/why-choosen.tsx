import HomeButton from "../components/button";
import BookLogo from "../assets/book.svg";
import Quest from "../assets/quest.svg";

import NextArrow from "../assets/nextArrow.svg";

interface JobRowProps {
  nextStep: () => void;
}

const WhyChoosen = ({ nextStep }: JobRowProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white w-[60%] rounded-md p-4">
        <div className="bg-[#E7F6EC] text-[#0F973D] text-[14px] rounded-full p-1 px-4 w-max">
          <span>Background question</span>
        </div>
        <h3 className="text-[#667185] text-[30px] mt-10">
          Please tell me why you would be a good fit for this role?
        </h3>
        <div className="flex items-center justify-between border-t border-t-[#D0D5DD] pt-4 mt-4">
          <div className="  flex gap-4 items-center">
            <HomeButton label="Answer" onClick={nextStep} />
            <div className="border border-[#101928] rounded-lg  p-[15px] cursor-pointer">
              <img src={BookLogo} alt="img" />
            </div>
            <div className="border border-[#101928] rounded-lg  p-3 cursor-pointer">
              <img src={Quest} alt="img" />
            </div>
          </div>
          <div className="border border-[#101928] rounded-lg  p-3 cursor-pointer">
            <img src={NextArrow} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoosen;
