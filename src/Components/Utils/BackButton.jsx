import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{boxShadow:"5px 5px 5px #808080"}}
      className="absolute top-[10%] z-[999] left-[60px] flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-transparent 
                 text-base font-semibold transition-all duration-300
                 bg-white text-pink-500 
                 hover:bg-gradient-to-r hover:from-[var(--gradient-start)] hover:via-[var(--gradient-mid2)] hover:to-[var(--gradient-end)]
                 hover:text-white cursor-pointer"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </button>
  );
};

export default BackButton;
