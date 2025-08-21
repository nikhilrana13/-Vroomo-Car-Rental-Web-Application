import React, { useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SignIn from './SignIn';
import { useDispatch, useSelector } from 'react-redux';
import ProfileDropdownMenu from '../pagecomponents/ProfileDropdownMenu';
import unknownuser from "../../assets/unknownuser.webp"
import axios from 'axios';
import { SetUser } from '@/Redux/AuthSlice';
import { toast } from 'sonner';
import { useCallback } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.Auth.user)
    // console.log("user",user)
    const [toggle, setToggle] = useState(false);
    const location = useLocation()
    const handleToggle = () => {
        setToggle(!toggle);
    }
    useEffect(()=>{
        Aos.init({duration:1000})
    },[])
    // handle logout
    const handleLogout = useCallback(async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/log-out`, { withCredentials: true });
            // console.log("response",response);
            if (response.data) {
                toast.success(response?.data?.message);
                localStorage.removeItem("token");
                dispatch(SetUser(null));
                navigate("/");
            }
        } catch (error) {
            console.log("error in logout", error);
            toast.error(error?.response?.data?.message);
        }
    }, [dispatch, navigate])

    return (
        <header data-aos ="fade-down" className='flex  items-center  font-[sans-serif] min-h-[75px] tracking-wide relative z-50'>
            <nav className="flex max-w-screen-xl mx-auto  w-full">
                <div className="flex flex-wrap items-center justify-between lg:gap-y-2 gap-2 w-full">
                    {/* Logo */}
                    <span className='text-[1.5rem] bg-white rounded-md px-5 py-2 border font-[700]'>VR<span className='text-[#0946EE]'>OO</span>MO</span>

                    {/* Mobile Menu */}
                    <div
                        className={`flex max-lg:!block max-lg:fixed gap-5 max-lg:bg-white dark:bg-black max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 transition-transform duration-300 ${toggle ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
                            }`}
                    >
                        {/* Close Button */}
                        <button onClick={handleToggle} className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
                                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
                                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
                            </svg>
                        </button>
                        {/* Menu Items */}
                                <ul className="lg:flex items-center rounded-md gap-4 bg-white px-7 border cursor-pointer lg:gap-x-3 max-lg:space-y-3">
                                    <li className="max-lg:border-b p-2 max-lg:py-3 px-3">
                                        <NavLink to="/" className={({ isActive }) => isActive ? `text-[#0946EE] text-[1rem] ` : `text-black text-[1rem] hover:text-[#0946EE] dark:text-white  block`}>
                                            <p>HOME</p>
                                        </NavLink>
                                    </li>
                                    <li className="max-lg:border-b p-2 max-lg:py-3 px-3">
                                        <NavLink to="/find-cars" className={({ isActive }) => isActive ? `text-[#0946EE] text-[1rem] ` : `text-black text-[1rem] dark:text-white hover:text-[#0946EE]  block`}>
                                            <p>CARS</p>
                                        </NavLink>
                                    </li>
                                    <li className="max-lg:border-b p-2 max-lg:py-3 px-3">
                                        <NavLink to="/about" className={({ isActive }) => isActive ? `text-[#0946EE] text-[1rem] ` : `text-black text-[1rem] dark:text-white  hover:text-[#0946EE] block`}>
                                            <p>ABOUT</p>
                                        </NavLink>
                                    </li>
                                </ul>
                        
                    </div>
                    {/* Menu Toggle */}
                    <div className="flex items-center  gap-x-5 gap-y-3 ">
                        <div className="flex items-center gap-3">
                            {
                                user ? <ProfileDropdownMenu profilepic={user?.profilepic || unknownuser} name={user?.username} role={user?.role} logout={handleLogout} /> : <>
                                    <button type="button"
                                        class="px-5 py-3 rounded-md bg-[#0946EE] text-white">
                                        <SignIn />
                                    </button>
                                </>
                            }
                            {/* Mobile Menu Button */}
                            <button onClick={handleToggle} className="lg:hidden">
                                <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar