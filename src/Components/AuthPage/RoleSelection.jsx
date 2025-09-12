import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Briefcase } from "lucide-react";
import Spline from '@splinetool/react-spline';
import { path } from "d3";

const RoleSelection = () => {
  const navigate = useNavigate()
  const options = [
    {
      title: "Startup",
      description: "Showcase your idea, gain traction, and attract investors.",
      color: "bg-[var(--green-bright)]",
      icon: <Briefcase size={64} />,
      path: "/registration/startup"
    },
    {
      title: "Investor",
      description: "Discover innovative startups and invest in the future.",
      color: "bg-[var(--yellow-bright)]",
      icon: <User size={64} />,
      path: "/registration/investor"
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] relative">
      <Spline
        scene="https://prod.spline.design/QJb4fdFCrDlhnQOz/scene.splinecode"
      />
      <div className="h-[80%] w-[85%] absolute bg-[rgba(255,255,255,0.5)] rounded-[12px] mt-[2%] flex justify-center items-center flex-col"
        style={{ backdropFilter: "blur(5px)", boxShadow: "2px 2px 10px #808080" }}
      >
        <h2 className="primary-header">
          Register as
        </h2>
        <div className="flex justify-between w-[65%]">
          {options.map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative w-[325px] h-[350px] rounded-2xl shadow-xl bg-white p-6 cursor-pointer flex flex-col items-center justify-center text-white overflow-hidden`}

              onClick={()=>{
                navigate(option.path)
              }}
            >
              <motion.div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 primary-header group-hover:text-[#fff]" >{option.icon}</div>
                <h2 className=" font-bold mb-3 secondary-header  group-hover:text-[#fff]"
                style={{color:"var(--gradient-end)", textShadow:"2px 2px 2px #808080"}}
                >{option.title}</h2>
                <p className=" opacity-90 tertiary-header">{option.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RoleSelection;
