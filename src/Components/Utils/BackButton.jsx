import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-[13%] z-[999] left-[2%] btn btn-secondary flex justify-center items-center flex-row gap-[5px]"
      style={{width:"50px"}}
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
};

export default BackButton;
