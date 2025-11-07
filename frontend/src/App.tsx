import { useState } from "react";
import Header from "./components/header";
import Welcome from "./pages";
import JobRow from "./pages/job-row";
import AnswerQuestion from "./pages/anwser-question";
import WhyChoosen from "./pages/why-choosen";

const App = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div>
      <Header step={step} prevStep={prevStep} selectedRole={selectedRole} />
      {step === 1 && (
        <Welcome nextStep={nextStep} setSelectedRole={setSelectedRole} />
      )}
      {step === 2 && <JobRow nextStep={nextStep} />}
      {step === 3 && <AnswerQuestion nextStep={nextStep} />}
      {step === 4 && <WhyChoosen nextStep={nextStep} />}
    </div>
  );
};

export default App;
