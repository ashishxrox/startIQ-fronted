import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation(); // gives info about current URL
  const currentPath = location.pathname; // e.g., "/auth" or "/"

  return (
    <div className='h-[75px] w-full bg-white flex justify-center items-center'>
      <div className='w-[90%] h-full flex justify-between items-center flex-row'>
        <Link to={"/"} className='basis-[20%] h-[90%] w-full bg-[#808080] flex justify-center items-center'>
          Logo
        </Link>

        <div className={`basis-[25%] h-[90%] w-full flex justify-between items-center flex-row ${currentPath === '/auth' ?"relative":""}`}
        
        >
          <Link 
            to={"/auth"} 
            state={{ showLogin: true }}
            className={` btn btn-secondary flex justify-center items-center ${currentPath === '/auth' ? 'absolute z-[9] left-0' : 'text-black'}`}
          >
            Log in
          </Link>

          <Link 
            to={"/auth"} 
            state={{ showLogin: false }}
            className={`btn btn-primary flex justify-center items-center ${currentPath === '/auth' ? 'absolute z-[9] right-0' : 'text-black'} `}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
