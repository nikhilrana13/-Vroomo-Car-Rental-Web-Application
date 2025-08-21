import React from 'react'
import { Outlet,NavLink, useLocation, useNavigate } from 'react-router-dom'
import { PlusIcon,ListOrdered,UserCheck, Car,HomeIcon,ArrowRight,Settings,LayoutDashboard,LogOut, TicketCheck, TicketCheckIcon, CarFrontIcon, UserCheckIcon} from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { SetUser } from '@/Redux/AuthSlice'
import OwnerNavbar from '@/Components/OwnerDashboardComponent/OwnerNavbar'
import OwnerProfileCard from '@/Components/OwnerDashboardComponent/OwnerProfileCard'

const OwnerDashboard = () => {
  const user = useSelector((state)=>state.Auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  

     const handleLogout = async()=>{
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
    }
  return (
        <div className='w-full px-[2vw] py-2 sm:px-[4vw] sm:py-3'>
          <OwnerNavbar ownername={user?.username || "NA"} />
      <div className='flex shadow-md  md:p-8 p-3 rounded-md bg-[#F9FBFF] dark:bg-black flex-col items-center gap-3 justify-center'>
         <div className='flex gap-3'>
            <NavLink to="/">
                  <span><HomeIcon className='text-[#0B92ED] dark:text-white' /></span>
            </NavLink>
            <span> <ArrowRight className='text-[#465D7C] dark:text-white' /> </span>
            <span className='text-[#465D7C] dark:text-white'>Owner</span>
            <span> <ArrowRight className='text-[#465D7C] dark:text-white' /> </span>
            <span className='text-[#012047] dark:text-white'>Dashboard</span>

         </div>
          <h3 className='text-[#012047] dark:text-white font-[700] text-[1.5rem] md:text-[2rem]'>Dashboard</h3>
      </div>
      <div className='flex flex-col w-full p-5 gap-2 md:flex-row '>
        {/* left side content */}
        <div className='flex flex-col shadow-md rounded-md min-h-screen  p-4 gap-5  w-full md:w-[30%]'>
           {/* profile */}
            <OwnerProfileCard  /> 
           {/* links */}
           <div className='flex flex-col gap-2'>
            <NavLink to="/owner-dashboard/dashboard" className={({ isActive})=> isActive ? `bg-[#0E82FD]  text-white px-2 py-2 rounded-md flex items-center gap-2`:`px-2 py-2 hover:text-[#0E82FD] rounded-md `}>
                  <div className='flex items-center gap-4 '>
                    <LayoutDashboard />
                    <span className='inline'>Dashboard</span>
                 </div>
            </NavLink>
              <NavLink to="/owner-dashboard/add-car" className={({ isActive})=> isActive ? `bg-[#0E82FD]  text-white px-2 py-2 rounded-md flex items-center gap-2`:`px-2 py-2  hover:text-[#0E82FD] rounded-md `}>
                  <div className='flex items-center gap-4 '>
                    <PlusIcon />
                    <span className='inline'>Add Car</span>
                 </div>
            </NavLink>
             <NavLink to="/owner-dashboard/manage-bookings" className={({ isActive})=> isActive ? `bg-[#0E82FD]  text-white px-2 py-2 rounded-md flex items-center gap-2`:`px-2 py-2 hover:text-[#0E82FD] rounded-md `}>
                  <div className='flex items-center gap-4 '>
                    <TicketCheckIcon />
                    <span className='inline'>Manage Bookings</span>
                 </div>
            </NavLink>
              <NavLink to="/owner-dashboard/manage-cars" className={({ isActive})=> isActive ? `bg-[#0E82FD]  text-white px-2 py-2 rounded-md flex items-center gap-2`:`px-2 py-2 hover:text-[#0E82FD] rounded-md `}>
                  <div className='flex items-center gap-4 '>
                    <CarFrontIcon />
                    <span className='inline'>Manage Cars</span>
                 </div>
            </NavLink>
               <NavLink to="/owner-dashboard/owner-profile-update" className={({ isActive})=> isActive ? `bg-[#0E82FD]  text-white px-2 py-2 rounded-md flex items-center gap-2`:`px-2 py-2 hover:text-[#0E82FD] rounded-md `}>
                  <div className='flex items-center gap-4 '>
                    <UserCheckIcon />
                    <span className='inline'>Update Profile</span>
                 </div>
            </NavLink>
             <div  className="px-2 cursor-pointer py-2 hover:text-[#0E82FD] rounded-md ">
                  <div onClick={handleLogout} className='flex items-center gap-4 '>
                    <LogOut />
                    <span className='inline'>Logout</span>
                 </div>
            </div>

             
           </div>

        </div>
        {/* right side content */}
        {
          location.pathname === '/owner-dashboard' ? (
          <div className='flex w-full md:w-[70%] items-center justify-center gap-2'>
              <h3 className='text-[#012047] gap-4 flex items-center dark:text-white text-center font-[700] text-[1.5rem] md:text-[2rem]'>Welcome to  Vroomo <Car />!</h3>
          </div>

          ):(
            <div className='flex w-full flex-col md:w-[70%] '>
              <Outlet />
            </div>
          )
        }
      </div>

    </div>
  )
}

export default OwnerDashboard