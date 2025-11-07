import HomeButton from "../components/button";
import QuestionImage from "../assets/grouplaptop.svg";

interface AnswerQuestionProps {
  nextStep: () => void;
}

const AnswerQuestion = ({ nextStep }: AnswerQuestionProps) => {
  const handleQuestion = () => {
    nextStep();
  };
  return (
    <div className="flex justify-center m-auto items-center min-h-screen relative flex-col">
      <div className=" bg-white rounded-xl w-[360px] flex flex-col text-center  p-5">
        <div className="bg-[#F9FAFB] w-full p-10 mb-6">
          <img
            src={QuestionImage}
            alt="question illustration"
            className="m-auto "
          />
        </div>
        <h5 className="text-[#001633] text-[20px] font-medium">
          Answer 9 interview questions
        </h5>
        <p className="text-[16px] text-[#667185] font-normal my-6 w-[280px] text-center mx-auto">
          When you are done, review your answers and discover insights.
        </p>

        <HomeButton label={"Practice Now"} onClick={handleQuestion} />
      </div>
      <h6 className=" text-[#0088FF] text-[16px] font-semibold underline my-6 cursor-pointer">
        See All questions
      </h6>
    </div>
  );
};

export default AnswerQuestion;
