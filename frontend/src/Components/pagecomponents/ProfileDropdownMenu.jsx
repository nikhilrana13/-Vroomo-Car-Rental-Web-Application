import React, { useState, useEffect, useRef } from 'react';
import { LogOut, User, UserCircle2Icon, PlusIcon, LogOutIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProfileDropdownMenu = React.memo(({ profilepic, name, role,logout}) => {
  const user = useSelector((state)=>state.Auth.user)
    const location = useLocation()
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-max mx-auto">
      <button
        type="button"
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`px-4 py-2 flex items-center  hover:text-black rounded-full  text-sm font-medium border border-slate-300 outline-none  ${location.pathname === "/manage-bookings" || location.pathname === "/find-cars" ? "hover:bg-gray-100" : "hover:bg-slate-800" }  `}

      >
        <img
          src={profilepic}
          className="w-7 h-7 mr-3 rounded-full shrink-0"
          alt="Profile"
        />
        <span className={`hidden sm:inline ${location.pathname === "/manage-bookings" || location.pathname === "/find-cars" ? "text-black" : "text-white"
    }`}
  >
    {name}
  </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 fill-slate-400 inline ml-3"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute shadow-lg  text-black  bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto"
        >
          <li className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-200 text-slate-900 text-sm cursor-pointer">
            <>
              <div className='flex items-center'>
                <img src={profilepic} className='w-8 h-8 rounded-full' alt="" />
                <div className='flex flex-col ml-2'>
                  <h3 className='text-sm text-black'>{name}</h3>
                  <span className=' text-green-500'>{role}</span>
                </div>
              </div>
            </>
          </li>
            {
              user.role === "Renter" ? 
                  <>
                     <NavLink to="/profile-update">
                <li className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-200 text-slate-900 text-sm cursor-pointer"
                >Profile Settings</li>
              </NavLink>
             <NavLink to="/manage-bookings" className={`${location.pathname === "/manage-bookings" ? "hidden":"block"}`}>
                 <li className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-200 text-slate-900 text-sm cursor-pointer"
               >My Bookings</li>
              </NavLink>
                  </>
               :  <NavLink to="/owner-dashboard/dashboard">
                 <li className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-200 text-slate-900 text-sm cursor-pointer"
               >Dashboard</li>
              </NavLink>

              
            }
          
          <li onClick={logout} className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-200 text-slate-900 text-sm cursor-pointer">
            Logout
          </li>
        </ul>

      )}

    </div>


  );
})

export default ProfileDropdownMenu;
