import React, { useState, useEffect } from "react";
import Spline from '@splinetool/react-spline';
import { useLocation } from "react-router-dom";
import LoginCard from "./LoginCard";
import SignupCard from "./SignupCard";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(false);
    const location = useLocation();

    const toggleAuth = () => {
        setIsLogin(!isLogin);
    };

    useEffect(() => {
        if (location.state?.showLogin !== undefined) {
            setIsLogin(location.state.showLogin);
        }
    }, [location.state]);
    return (
        <div className='h-[90vh] w-full flex flex-row overflow-x-hidden'>
            <div className="h-full w-full flex flex-row justify-center items-center overflow-x-hidden">
                <div className='login-card h-[90vh] w-[50%]  absolute '
                    style={{ transform: "translateX(-50%)", opacity: `${!isLogin ? "0" : "1"}`, transition: "all 0.5s ease-in-out" }}
                >
                    <LoginCard />
                </div>
                <div className='graphic-card h-[90vh] bg-white w-[50%] absolute flex justify-center items-center '
                    style={{ transform: `${!isLogin ? "translateX(-50%)" : "translateX(50%)"}`, transition: "all 1s ease-in-out" }}
                >
                    <div className="absolute h-full w-full left-[-3%] z-[9] top-[-25%]">
                    </div>

                    <Spline

                        scene="https://prod.spline.design/sQHM2aFvumTnY60f/scene.splinecode"
                        className="h-[70%] w-full absolute top-[-25%] left-[-3%] z-[-9999]"
                    />
                    <button
                        onClick={toggleAuth}
                        className="btn btn-secondary transition absolute bottom-[15%]"
                    >
                        {isLogin ? "Go to Signup" : "Go to Login"}
                    </button>

                    <div className="bg-white h-[50px] w-[300px] absolute bottom-[27%] right-[0]"></div>
                    <div className="absolute w-[65%] h-[35%] top-[40%] bg-[#808080]"></div>
                </div>
                <div className='signup-card h-[90vh] w-[50%]  absolute '
                    style={{ transform: `${!isLogin ? "translateX(50%)" : "translateX(150%)"}`, transition: "all 1s ease-in-out" }}
                >
                    <SignupCard />
                </div>
            </div>
        </div>
    )
}

export default Auth
