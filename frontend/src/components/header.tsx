import Logo from "../assets/reframelogo.svg";
import Speaker from "../assets/speaker.svg";
import HomeButton from "./button";
import BackArrow from "../assets/backarrow.svg";
import type { HeaderProps } from "../utils/interface";

const Header = ({ step, prevStep, selectedRole }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between h-[70px] px-14 bg-white sticky top-0 shadow-xs z-10">
      {step === 1 ? (
        <HomeButton label={"Practice Now"} />
      ) : (
        <div className="flex items-center gap-4">
          <img
            src={BackArrow}
            alt="back"
            className="cursor-pointer"
            onClick={prevStep}
          />
          {selectedRole && (
            <p className="text-md font-medium text-[#667185] ">
              {selectedRole}
            </p>
          )}
        </div>
      )}

      <img src={Logo} alt="logo" />

      <img src={Speaker} alt="speaker" className="cursor-pointer" />
    </div>
  );
};

export default Header;
