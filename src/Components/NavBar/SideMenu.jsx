import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, User, Bookmark, Bell, List } from "lucide-react";
import { checkUserRole } from "../../services/userService";

const SideMenu = ({userName}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const toggleMenu = () => setIsOpen(!isOpen);
    
    

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={toggleMenu}
                className={`fixed top-4 ${isOpen ? "right-10" : "right-5"} cursor-pointer  z-50 flex items-center gap-2 px-4 py-2 
                   btn btn-primary flex justify-center items-center
                   transition-transform duration-300`}
            >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                {isOpen ? "Close" : "Menu"}
            </button>

            {/* Overlay (dim background when menu is open) */}
            {isOpen && (
                <div
                    onClick={toggleMenu}
                    className="fixed inset-0 bg-[rgba(0,0,0,0.5)]  z-40"
                />
            )}

            {/* Side Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-2xl 
                   flex flex-col p-6 gap-6
                   ${isOpen ? "animate-slide-in" : "animate-slide-out"} `}
            >
                <button
                    onClick={toggleMenu}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>
                <div className="h-[10%] w-full flex justify-center gap-[5px] flex-col items-start">
                    <p className="text-m font-bold text-gray-800">Hi...</p>
                <h2 className="text-xl font-bold text-gray-800">{userName}</h2>
                </div>
                

                <nav className="flex flex-col gap-4 text-gray-700 font-medium">
                    <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                        <User className="w-5 h-5 text-pink-500" />
                        View Profile
                    </button>

                    <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                        <Bookmark className="w-5 h-5 text-purple-500" />
                        Saved Startups
                    </button>

                    <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                        <Bell className="w-5 h-5 text-blue-500" />
                        Updates
                    </button>
                    {/* New option: Listing Page */}
                    <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                        <List className="w-5 h-5 text-green-500" />
                        Listing Page
                    </button>
                </nav>
            </div>
        </>
    );
};

export default SideMenu;
