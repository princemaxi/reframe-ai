import HomeInput from "../components/input";
import SearchIcon from "../assets/searchicon.svg";

interface WelcomeProps {
  nextStep: () => void;
  setSelectedRole: (role: string) => void;
}

const Jobrole = [
  { title: "UX Designer" },
  { title: "AI Specialist" },
  { title: "Automobile Engineer" },
  { title: "Associate Developer" },
  { title: "Accountant" },
];

const Welcome = ({ nextStep, setSelectedRole }: WelcomeProps) => {
  const handleComplete = (role: string) => {
    setSelectedRole(role);
    nextStep();
  };

  return (
    <div className="text-center flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-[#000000] text-5xl font-medium">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-[#F56630] to-[#1671D9] bg-clip-text text-transparent">
          Reframe AI
        </span>
      </h1>

      <p className="text-[#475367] font-normal text-[16px] mt-6 mb-10 max-w-[600px] leading-[24px]">
        Practice key interview questions for any job role. Our AI doesn't just
        give feedback — it teaches you how to reframe your self-motivation, time
        management, and remote-work skills into the exact strengths employers
        are looking for.
      </p>

      <p className="mb-4 text-[12px] text-[#475367] font-medium">
        What job role are you practicing for?
      </p>

      <HomeInput
        icon={<img src={SearchIcon} alt="search icon" />}
        iconPosition="left"
        type="text"
        placeholder="Example: cybersecurity, accountant..."
        suggestions={Jobrole}
        onComplete={handleComplete} // pass role upward
      />
    </div>
  );
};

export default Welcome;
