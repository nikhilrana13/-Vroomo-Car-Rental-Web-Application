import React from 'react'
import Home from './Pages/Home'
import {Routes,Route} from "react-router-dom"
import { Toaster } from './Components/ui/sonner'
import OwnerDashboard from './Pages/OwnerDashboard'
import ProfileUpdate from './Components/pagecomponents/ProfileUpdate'
import MyBookings from './Components/pagecomponents/MyBookings'
import FindCars from './Pages/FindCars'
import Dashboard from './Components/OwnerDashboardComponent/Dashboard'
import AddCar from './Components/OwnerDashboardComponent/AddCar'
import ManageBookings from './Components/OwnerDashboardComponent/ManageBookings'
import ManageCars from './Components/OwnerDashboardComponent/ManageCars'
import UpdateCarsDetails from './Components/OwnerDashboardComponent/UpdateCarsDetails'
import UpdateOwnerProfile from './Components/OwnerDashboardComponent/UpdateOwnerProfile'
import ScrollToTop from './Components/pagecomponents/ScrollToTop'
import CarDetails from './Components/pagecomponents/CarDetails'
import IsOwner from './Components/ProtectedRoute/isOwner'
import IsRenter from './Components/ProtectedRoute/isRenter'


const App = () => {
  return (
    <div className='w-full'>
      {/* Routes */}
      <ScrollToTop />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/find-cars' element={<FindCars />} />
          <Route path='profile-update' element={<IsRenter><ProfileUpdate /></IsRenter>} />
          <Route path='manage-bookings' element={<IsRenter><MyBookings /></IsRenter>} />
          <Route path='car-details/:id' element={<CarDetails />} />
          {/* owner dashboard */}
          <Route element={<IsOwner />}>
            <Route path='/owner-dashboard' element={<OwnerDashboard />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='add-car' element={<AddCar />} />
            <Route path='manage-bookings' element={<ManageBookings />} />
            <Route path='manage-cars' element={<ManageCars />} />
            <Route path='update-car-details/:id' element={<UpdateCarsDetails />} />
            <Route path='owner-profile-update' element={<UpdateOwnerProfile />} />
          </Route>
          </Route>
      </Routes>
      <Toaster position="top-center" richColors />
    </div>
  )
}

export default App